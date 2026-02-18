import LaunchIcon from "@mui/icons-material/Launch";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Button,
  Chip,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

import BASE_URL from "../../BaseUrl";

interface Haber {
  id: number;
  konu: string;
  icerik: string;
  haberLinki: string;
  createdDate: string;
  gecerlilikTarihi: string;
}

export default function UserHaberManagement() {
  const [news, setNews] = useState<Haber[]>([]);
  const [selectedHaber, setSelectedHaber] = useState<Haber | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/haber`);
      setNews(res.data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString("tr-TR") : "-";

  
  const columns: GridColDef[] = [
    {
      field: "konu",
      headerName: "Haber Konusu",
      flex: 1, 
      align: "center", 
      headerAlign: "center", 
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={700} sx={{ color: "#1e293b", textAlign: "center" }}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "createdDate",
      headerName: "Eklenme Tarihi",
      flex: 1, 
      align: "center", 
      headerAlign: "center",
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={600} sx={{ color: "#64748b" }}>
          {formatDate(params.value)}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Haber Detayı",
      flex: 1, 
      align: "center", 
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          disableElevation
          startIcon={<VisibilityIcon />}
          onClick={() => setSelectedHaber(params.row)}
          sx={{ 
            borderRadius: "6px", 
            textTransform: "none", 
            fontWeight: 700,
            bgcolor: "#1a73e8",
            '&:hover': { bgcolor: '#1557b0' }
          }}
        >
          İncele
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "83vh", bgcolor: "#fff", p: { xs: 2, md: 4 } }}>
      <CssBaseline />

      <Stack spacing={3} sx={{ height: "calc(100% - 20px)" }}>
        

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <NewspaperIcon sx={{ fontSize: 45, color: "#1a73e8" }} />
            <Typography variant="h4" fontWeight={900} color="#0f172a" sx={{ letterSpacing: "-1px" }}>
              Güncel Haberler
            </Typography>
          </Box>
          <Chip 
            label={`Toplam ${news.length} Haber`} 
            sx={{ 
              fontWeight: 800, 
              bgcolor: "#1a73e8", 
              color: "#fff", 
              borderRadius: 1.5, 
              px: 1,
              fontSize: "0.9rem" 
            }} 
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
            rows={news}
            columns={columns}
            getRowId={(row) => row.id}
            getRowHeight={() => 'auto'}
            disableRowSelectionOnClick
            
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


      <Dialog
        open={!!selectedHaber}
        onClose={() => setSelectedHaber(null)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "20px", p: 1, boxShadow: '0 10px 40px rgba(0,0,0,0.1)' } }}
      >
        <DialogTitle sx={{ fontWeight: 900, fontSize: "1.75rem", color: "#0f172a", pb: 1 }}>
          {selectedHaber?.konu}
        </DialogTitle>
        
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Stack direction="row" spacing={3}>
                <Box>
                    <Typography variant="caption" fontWeight={800} color="text.secondary" display="block">Eklenme Tarihi</Typography>
                    <Typography variant="body2" fontWeight={700}>{formatDate(selectedHaber?.createdDate)}</Typography>
                </Box>
                <Box>
                    <Typography variant="caption" fontWeight={800} color="error.main" display="block">Son Geçerlilik Tarihi</Typography>
                    <Typography variant="body2" fontWeight={700} color="error.main">{formatDate(selectedHaber?.gecerlilikTarihi)}</Typography>
                </Box>
            </Stack>
            <Divider />
            <Box>
                <Typography variant="caption" fontWeight={800} color="text.secondary" sx={{ mb: 1, display: 'block' }}>Haber İçeriği</Typography>
                <Typography variant="body1" sx={{ lineHeight: 1.8, color: "#334155", whiteSpace: "pre-wrap", fontWeight: 500 }}>
                {selectedHaber?.icerik}
                </Typography>
            </Box>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ p: 3, gap: 1 }}>
          <Button 
            onClick={() => setSelectedHaber(null)} 
            variant="outlined"
            color="inherit" 
            sx={{ fontWeight: 700, borderRadius: "10px", textTransform: 'none' }}
          >
            Kapat
          </Button>
          {selectedHaber?.haberLinki && (
            <Button
              variant="contained"
              href={selectedHaber.haberLinki.startsWith('http') ? selectedHaber.haberLinki : `https://${selectedHaber.haberLinki}`}
              target="_blank"
              startIcon={<LaunchIcon />}
              sx={{ 
                borderRadius: "10px", 
                fontWeight: 700, 
                textTransform: 'none',
                bgcolor: "#1a73e8",
                px: 3
              }}
            >
              Habere Git
            </Button>
          )}
        </DialogActions>
      </Dialog>
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