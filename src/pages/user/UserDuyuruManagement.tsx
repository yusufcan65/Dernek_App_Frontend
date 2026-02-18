import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  Stack,
  CssBaseline,
  Chip,
} from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import CampaignIcon from "@mui/icons-material/Campaign";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import { Tooltip } from "@mui/material";

// WebSocket için gerekli kütüphaneler
import SockJS from "sockjs-client";
import { over } from "stompjs";

import BASE_URL from "../../BaseUrl";

interface Duyuru {
  id: number;
  konu: string;
  icerik: string;
  resimYolu: string;
  createdDate: string;
  gecerlilikTarihi: string;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer sx={{ p: 1, bgcolor: "#f8fafc" }}>
      <GridToolbarQuickFilter 
        placeholder="Duyurularda ara..."
        sx={{ 
          ml: 'auto', 
          "& .MuiInput-underline:before": { borderBottom: "none" },
          "& .MuiInput-underline:after": { borderBottom: "2px solid #f59e0b" }
        }} 
      />
    </GridToolbarContainer>
  );
}

export default function UserDuyuruManagement() {
  const [announcements, setAnnouncements] = useState<Duyuru[]>([]);

  // Verileri ilk yükleme için çekiyoruz
  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/duyuru`);
      setAnnouncements(res.data);
    } catch (error) {
      console.error("Duyuru çekme hatası:", error);
    }
  };

  useEffect(() => {
    fetchData();

    // --- WebSocket Bağlantısı Kurulumu ---
    const socket = new SockJS(`${BASE_URL}/ws`); // Backend'deki WebSocket endpoint'i
    const stompClient = over(socket);

    stompClient.connect({}, () => {
      console.log("WebSocket bağlantısı başarılı!");


      stompClient.subscribe("/topic/duyuru", (payload) => {
        const yeniDuyuru = JSON.parse(payload.body);
        

        setAnnouncements((prev) => {
          const exists = prev.find(d => d.id === yeniDuyuru.id);
          if (exists) {
            return prev.map(d => d.id === yeniDuyuru.id ? yeniDuyuru : d);
          }
          return [yeniDuyuru, ...prev];
        });
      });
    }, (error) => {
      console.error("WebSocket bağlantı hatası: ", error);
    });

    return () => {
      if (stompClient && stompClient.connected) {
        stompClient.disconnect();
      }
    };
  }, []);

  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString("tr-TR", { day: '2-digit', month: 'long', year: 'numeric' }) : "-";

  const getImageUrl = (path?: string) => {
    if (!path) return "";
    const fileName = path.split("\\").pop()?.split("/").pop();
    return `${BASE_URL}/uploads/${fileName}`;
  };

const columns: GridColDef[] = [
  {
    field: "resimYolu",
    headerName: "Resim",
    flex: 1,
    minWidth: 120,
    sortable: false,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <Avatar
        src={getImageUrl(params.value)}
        variant="rounded"
        sx={{ width: 50, height: 50, border: "1px solid #e2e8f0", my: 1 }}
      />
    ),
  },
  {
    field: "konu",
    headerName: "Duyuru Konusu",
    flex: 1,
    minWidth: 150,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <Typography
        variant="body1"
        fontWeight={400}
        color="#1e293b"
        textAlign="center"
        sx={{
          whiteSpace: "normal",
          wordBreak: "break-word",
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "icerik",
    headerName: "İçerik",
    flex: 1,
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ 
          whiteSpace: 'normal', 
          wordBreak: 'break-word',
          lineHeight: 1.4,
          textAlign: "center"
        }}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "createdDate",
    headerName: "Yayınlanma Tarihi",
    flex: 1,
    minWidth: 140,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <Typography 
        variant="body1" 
        fontWeight={700} 
        color="#64748b" 
        textAlign="center"
        sx={{
          whiteSpace: 'normal',
          wordBreak: 'break-word'
        }}
      >
        {formatDate(params.value)}
      </Typography>
    ),
  },
  {
    field: "gecerlilikTarihi",
    headerName: "Son Geçerlilik Tarihi",
    flex: 1,
    minWidth: 140,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      const today = new Date();
      const date = params.value ? new Date(params.value) : null;
      const isExpired = date ? date < today : false;

      return (
        <Tooltip title={isExpired ? "Geçerlilik tarihi geçmiş" : ""} arrow>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}>
            <EventAvailableIcon sx={{ fontSize: 16, color: isExpired ? "red" : "#10b981" }} />
            <Typography 
              variant="body1" 
              fontWeight={700} 
              color={isExpired ? "red" : "#10b981"} 
              textAlign="center"
              sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
            >
              {formatDate(params.value)}
            </Typography>
          </Stack>
        </Tooltip>
      );
    },
  },
];

  return (
    <Box sx={{ width: "100%", height: "83vh", bgcolor: "#fff", p: { xs: 2, md: 4 } }}>
      <CssBaseline />

      <Stack spacing={3} sx={{ height: "calc(100% - 20px)" }}>
     
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CampaignIcon sx={{ fontSize: 45, color: "#f59e0b" }} />
            <Typography variant="h4" fontWeight={900} color="#0f172a" sx={{ letterSpacing: "-1px" }}>
              Duyuru Galerisi
            </Typography>
          </Box>
          <Chip 
            label={`Toplam ${announcements.length} Duyuru`} 
            sx={{ fontWeight: 800, bgcolor: "#f59e0b", color: "#fff", borderRadius: 1.5, px: 1 }} 
          />
        </Box>

     
       <Box 
  sx={{ 
    width: "100%", 
    height: 480, 
    bgcolor: "white", 
    borderRadius: 2, 
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)", 
    display: "flex",
    flexDirection: "column"
  }}
>
  <DataGrid
    rows={announcements}
    columns={columns}
    getRowId={(row) => row.id}
    getRowHeight={() => 'auto'}
    disableRowSelectionOnClick
    slots={{ toolbar: CustomToolbar }}
    
    sx={{
      ...gridStyle,
      border: "none",

      "& .MuiDataGrid-virtualScroller": {
        overflowY: "auto", 
      },

      "& .MuiDataGrid-footerContainer": {
        overflow: "hidden",
        borderTop: "1px solid #e2e8f0",
        minHeight: "52px", 
      },
      "& .MuiTablePagination-root": {
        overflow: "hidden",
      }
    }}

    initialState={{
      pagination: { 
        paginationModel: { pageSize: 10, page: 0 } 
      },
    }}
    pageSizeOptions={[5, 10, 25, 50]}
    localeText={{
      MuiTablePagination: {
        labelRowsPerPage: 'Sayfa başı kayıt:',
        labelDisplayedRows: ({ from, to, count }) => `${from}-${to} / ${count !== -1 ? count : `${to}'den fazla`}`
      }
    }}
  />
</Box>
      </Stack>
    </Box>
  );
}

const gridStyle = {
  border: "none",
  "& .MuiDataGrid-columnHeaders": {
    bgcolor: "#f8fafc",
    borderBottom: "2px solid #e2e8f0",
    minHeight: "70px !important",
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 900,
    fontSize: "1rem",
    whiteSpace: "normal",
    wordBreak: "break-word",
    textAlign: "center",
  },
  "& .MuiDataGrid-cell": {
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    py: 1,
    whiteSpace: "normal",
    wordBreak: "break-word",
    textAlign: "center",
  },
  "& .MuiDataGrid-columnSeparator": { display: "none" },
  "& .MuiDataGrid-footerContainer": {
    borderTop: "2px solid #e2e8f0",
    bgcolor: "#f8fafc"
  },
  "& .MuiDataGrid-row:hover": { bgcolor: "#f1f5f9 !important" },
};
