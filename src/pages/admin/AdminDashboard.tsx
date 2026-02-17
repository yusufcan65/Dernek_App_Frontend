import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Chip, Avatar, CssBaseline, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import CampaignIcon from '@mui/icons-material/Campaign';

import BASE_URL from "../../BaseUrl";

export default function AdminDashboard() {
  const [news, setNews] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [newsRes, annRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/haber`),
        axios.get(`${BASE_URL}/api/duyuru`)
      ]);
      setNews(newsRes.data);
      setAnnouncements(annRes.data);
    } catch (error) { console.error(error); }
  };

  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString("tr-TR") : "-";

  const getImageUrl = (path?: string) => {
    if (!path) return "";
    const fileName = path.split("\\").pop()?.split("/").pop();
    return `${BASE_URL}/uploads/${fileName}`;
  };

  const latestNews = [...news].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()).slice(0, 5);
  const latestAnnouncements = [...announcements].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()).slice(0, 5);

  // Haberler Kolonları: flex 1-1-1 simetrisi
  const newsColumns: GridColDef[] = [
    { 
      field: "konu", 
      headerName: "HABER BAŞLIĞI", 
      flex: 1, 
      renderCell: (p) => <Typography variant="body2" fontWeight={700}>{p.value}</Typography> 
    },
    { 
      field: "createdDate", 
      headerName: "TARİH", 
      flex: 1, 
      align: 'center', 
      headerAlign: 'center', 
      renderCell: (p) => formatDate(p.value) 
    },
    {
  
    field: "haberLinki", 
    headerName: "LİNK", 
    flex: 1, 
    align: 'right', 
    headerAlign: 'right',
    renderCell: (params) => {
      // Link https ile başlamıyorsa ekle
      const url = params.value?.startsWith("http") ? params.value : `https://${params.value}`;
      return (
        <Tooltip title="Habere git" arrow>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit", cursor: "pointer" }}
          >
            {params.value}
          </a>
        </Tooltip>
      );
    }
  },
  ];

  // Duyurular Kolonları: flex 1-1-1 simetrisi
  const announcementColumns: GridColDef[] = [
    { 
      field: "resimYolu", 
      headerName: "GÖRSEL", 
      flex: 1, 
      renderCell: (p) => <Avatar src={getImageUrl(p.value)} variant="rounded" sx={{ width: 40, height: 40 }} /> 
    },
    { 
      field: "konu", 
      headerName: "DUYURU KONUSU", 
      flex: 1, 
      align: 'center', 
      headerAlign: 'center', 
      renderCell: (p) => <Typography variant="body2" fontWeight={700}>{p.value}</Typography> 
    },
    { 
      field: "createdDate", 
      headerName: "TARİH", 
      flex: 1, 
      align: 'right', 
      headerAlign: 'right', 
      renderCell: (p) => formatDate(p.value) 
    },
  ];

  return (
    <Box sx={{ width: "100%", height: "100%", display: "flex", bgcolor: "#fff", p: 2, overflow: "hidden" }}>
      <CssBaseline />

      {/* HABERLER - SOL PANEL */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2, border: "1px solid #f0f0f0", borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <NewspaperIcon sx={{ fontSize: 32, color: "#1a73e8" }} />
            <Typography variant="h4" fontWeight={900}>Haberler</Typography>
          </Box>
          <Chip label={`Toplam ${news.length} `} color="primary" sx={{ fontWeight: 800 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <DataGrid rows={latestNews} columns={newsColumns} hideFooter autoHeight disableRowSelectionOnClick sx={gridStyle} />
        </Box>
      </Box>

      {/* İKİ TABLO ARASINDAKİ BOŞLUK */}
      <Box sx={{ width: 40 }} /> 

      {/* DUYURULAR - SAĞ PANEL */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2, border: "1px solid #f0f0f0", borderRadius: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <CampaignIcon sx={{ fontSize: 35, color: "#f59e0b" }} />
            <Typography variant="h4" fontWeight={900}>Duyurular</Typography>
          </Box>
          <Chip label={`Toplam ${announcements.length} `} sx={{ bgcolor: "#f59e0b", color: "#fff", fontWeight: 800 }} />
        </Box>
        <Box sx={{ flex: 1 }}>
          <DataGrid rows={latestAnnouncements} columns={announcementColumns} hideFooter autoHeight disableRowSelectionOnClick sx={gridStyle} />
        </Box>
      </Box>
    </Box>
  );
}

const gridStyle = {
  border: "none",
  "& .MuiDataGrid-columnHeaders": { 
    borderBottom: "2px solid #f0f0f0", 
    fontWeight: 900, // Başlıklar kalın
    fontSize: "0.85rem", // Başlık yazısı biraz daha büyük
    color: "#333" 
  },
  "& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: "900 !important", // Başlık yazı tipini kesin olarak kalınlaştırır
  },
  "& .MuiDataGrid-cell": { 
    borderBottom: "1px solid #f9f9f9", 
    display: "flex", 
    alignItems: "center" 
  },
  "& .MuiDataGrid-columnSeparator": { display: "none" }
};