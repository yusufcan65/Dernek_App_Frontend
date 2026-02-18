import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Drawer,
  TextField,
  Typography,
  IconButton,
  Stack,
  Paper,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import axios from "axios";
import { Tooltip } from "@mui/material";

import BASE_URL from "../../../BaseUrl";

const API = `${BASE_URL}/api/haber`;

interface Haber {
  id?: number;
  konu: string;
  icerik: string;
  gecerlilikTarihi: string;
  haberLinki: string;
}

function HaberManagement() {
  const [open, setOpen] = useState(false);
  const [haberler, setHaberler] = useState<Haber[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Haber>({
    konu: "",
    icerik: "",
    gecerlilikTarihi: "",
    haberLinki: "",
  });


  const fetchHaberler = async () => {
    const res = await axios.get(API);
    setHaberler(res.data);
  };

  useEffect(() => {
    fetchHaberler();
  }, []);


  const handleSave = async () => {
    if (!form.konu || !form.icerik || !form.gecerlilikTarihi || !form.haberLinki) {
      alert("Lütfen tüm alanları doldurun!");
      return;
    }
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0]; 
    if (form.gecerlilikTarihi < todayStr) {
      alert("Geçerlilik tarihi bugünden önce olamaz!");
      return;
    }
    if (form.id) {
      await axios.put(`${API}/guncelle/${form.id}`, form);
    } else {
      await axios.post(`${API}/ekle`, form);
    }

    await fetchHaberler();
    resetForm();
  };

  const resetForm = () => {
    setForm({
      konu: "",
      icerik: "",
      gecerlilikTarihi: "",
      haberLinki: "",
    });
    setOpen(false);
  };


  const handleDelete = async () => {
    if (!deleteId) return;
    await axios.delete(`${API}/sil/${deleteId}`);
    setDeleteId(null);
    fetchHaberler();
  };


  const handleEdit = (row: Haber) => {
    setForm(row);
    setOpen(true);
  };


  const columns: GridColDef[] = [
    {
      field: "konu",
      headerName: "Konu",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "icerik",
      headerName: "İçerik",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "gecerlilikTarihi",
      headerName: "Geçerlilik Tarihi",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
  
  field: "haberLinki",
  headerName: "Haber Linki",
  flex: 1,
  align: "center",
  headerAlign: "center",
  renderCell: (params) => {

    const url = params.value?.startsWith("http") ? params.value : `https://${params.value}`;
    return (
      <Tooltip title="Habere git" arrow>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "none",
            cursor: "pointer",
          }}
        >
          {params.value}
        </a>
      </Tooltip>
    );
  },
},



    {
      field: "actions",
      headerName: "İşlemler",
      flex: 1,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditTwoToneIcon color="primary" />
          </IconButton>

          <IconButton color="error" onClick={() => setDeleteId(params.row.id)}>
            <DeleteOutlineRoundedIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];



  return (
    <Box sx={{ height: "100%", width: "100%", display: "flex", flexDirection: "column" }}>
     
     <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      mb={3}
      sx={{ pt: 3 }} 
    >
      <Typography variant="h4" fontWeight={700}>
        Haber Yönetimi
      </Typography>

      <Button
        variant="contained"
        startIcon={<AddRoundedIcon />}
        onClick={() => setOpen(true)}
        sx={{ borderRadius: 3, px: 3, fontWeight: 600 }}
      >
        Yeni Haber
      </Button>
    </Stack>




    
      <Paper
        sx={{
          flex: 1,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        }}
      >
        <DataGrid
          rows={haberler}
          columns={columns}
          getRowId={(r) => r.id!}
          disableRowSelectionOnClick
          rowHeight={90}
          pageSizeOptions={[10, 25, 50, 100]} 
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 }, 
            },
          }}
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F8FAFC",
              fontSize: "16px",
              fontWeight: 700,
              color: "#0F172A",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
              fontSize: "15px",
            },
            "& .MuiDataGrid-cell": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "14px",
            },
          }}
        />
      </Paper>


      <Drawer anchor="right" open={open} onClose={resetForm} PaperProps={{ sx: { width: 460, p: 4 } }}>
        <Typography variant="h5" fontWeight={700} mb={3}>
          {form.id ? "Haber Güncelle" : "Yeni Haber"}
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="Konu"
            required
            value={form.konu}
            onChange={(e) => setForm({ ...form, konu: e.target.value })}
          />

          <TextField
            label="İçerik"
            required
            multiline
            rows={4}
            value={form.icerik}
            onChange={(e) => setForm({ ...form, icerik: e.target.value })}
          />

          <TextField
            label="Haber Linki"
            value={form.haberLinki}
            required
            onChange={(e) => setForm({ ...form, haberLinki: e.target.value })}
          />

          <TextField
            label="Geçerlilik Tarihi"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
            value={form.gecerlilikTarihi}
            onChange={(e) => setForm({ ...form, gecerlilikTarihi: e.target.value })}
          />

          <Button variant="contained" size="large" onClick={handleSave} sx={{ py: 1.6, borderRadius: 3, fontWeight: 700 }}>
            {form.id ? "Güncelle" : "Kaydet"}
          </Button>
        </Stack>
      </Drawer>

     
      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)} maxWidth="xs">
        <DialogContent sx={{ textAlign: "center", p: 4 }}>
          <WarningAmberIcon sx={{ fontSize: 60, color: "error.main", mb: 2 }} />
          <Typography variant="h5" fontWeight={700} mb={1}>
            Silme Onayı
          </Typography>
          <Typography color="text.secondary">
            Bu haberi silmek istediğinize emin misiniz?
          </Typography>
        </DialogContent>

        <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
          <Button variant="outlined" onClick={() => setDeleteId(null)}>
            Vazgeç
          </Button>

          <Button variant="contained" color="error" onClick={handleDelete}>
            Sil
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default HaberManagement;
