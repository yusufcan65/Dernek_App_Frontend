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
  Avatar,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import axios from "axios";

import BASE_URL from "../../../BaseUrl";

const API = `${BASE_URL}/api/duyuru`;

interface Duyuru {
  id?: number;
  konu: string;
  icerik: string;
  gecerlilikTarihi: string;
  resimYolu?: string;
  resimFile?: File | null;
}

function DuyuruManagement() {
  const [open, setOpen] = useState(false);
  const [duyurular, setDuyurular] = useState<Duyuru[]>([]);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState<Duyuru>({
    konu: "",
    icerik: "",
    gecerlilikTarihi: "",
    resimFile: null,
  });

  const fetchDuyurular = async () => {
    const res = await axios.get(API);
    setDuyurular(res.data);
  };

  useEffect(() => {
    fetchDuyurular();
  }, []);

  const getImageUrl = (path?: string) => {
    if (!path) return "";
    const fileName =
      path.split("\\").pop() || path.split("/").pop();
    return `${BASE_URL}/uploads/${fileName}?t=${Date.now()}`;
  };

  const handleSave = async () => {
    if (!form.konu) {
      alert("Konu alanı boş olamaz!");
      return;
    }

    if (!form.icerik) {
      alert("İçerik alanı boş olamaz!");
      return;
    }

    if (!form.gecerlilikTarihi) {
      alert("Geçerlilik Tarihi alanı boş olamaz!");
      return;
    }
    if (!form.resimFile && !form.resimYolu) {
    alert("Lütfen bir Resim seçin Resim alanı boş olamaz!");
    return;
    }

    const today = new Date();
    const todayStr = today.toISOString().split("T")[0]; // YYYY-MM-DD
    if (form.gecerlilikTarihi < todayStr) {
      alert("Geçerlilik tarihi bugünden önce olamaz!");
      return;
    }

    const fd = new FormData();
    fd.append("konu", form.konu);
    fd.append("icerik", form.icerik);
    fd.append("gecerlilikTarihi", form.gecerlilikTarihi);

    if (form.resimFile) fd.append("resimYolu", form.resimFile);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    if (form.id) {
      await axios.put(`${API}/guncelle/${form.id}`, fd, config);
    } else {
      await axios.post(`${API}/ekle`, fd, config);
    }

    await fetchDuyurular();
    resetForm();
  };


  const resetForm = () => {
    setForm({
      konu: "",
      icerik: "",
      gecerlilikTarihi: "",
      resimFile: null,
    });
    setOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    await axios.delete(`${API}/sil/${deleteId}`);
    setDeleteId(null);
    fetchDuyurular();
  };

  const handleEdit = (row: Duyuru) => {
    setForm({ ...row, resimFile: null });
    setOpen(true);
  };

  const columns: GridColDef[] = [
    {
      field: "resimYolu",
      headerName: "Resim",
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params: GridRenderCellParams) => (
        <Avatar
          src={getImageUrl(params.value)}
          variant="rounded"
          sx={{ width: 60, height: 60 }}
        />
      ),
    },
    { field: "konu", headerName: "Konu", flex: 1, align: "center", headerAlign: "center" },
    { field: "icerik", headerName: "İçerik", flex: 1, align: "center", headerAlign: "center" },
    {
  field: "gecerlilikTarihi",
  headerName: "Geçerlilik Tarihi",
  flex: 1,
  align: "center",
  headerAlign: "center",
  renderCell: (params: GridRenderCellParams<string>) => {
    if (!params.value) return "";
    const date = new Date(params.value);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); 
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
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
          Duyuru Yönetimi
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setOpen(true)}
          sx={{ borderRadius: 3, px: 3, fontWeight: 600 }}
        >
          Yeni Duyuru
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
          rows={duyurular}
          columns={columns}
          getRowId={(r) => r.id!}
          disableRowSelectionOnClick
          rowHeight={90}
          pageSizeOptions={[10, 25, 50, 100]} // buraya 10'u ekledik
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10, page: 0 }, // başlangıç olarak 10 göster
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
          {form.id ? "Duyuru Güncelle" : "Yeni Duyuru"}
        </Typography>

        <Stack spacing={3}>
          <TextField label="Konu" required value={form.konu} onChange={(e) => setForm({ ...form, konu: e.target.value })} />

          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              src={form.resimFile ? URL.createObjectURL(form.resimFile) : getImageUrl(form.resimYolu)}
              variant="rounded"
              sx={{ width: 120, height: 120 }}
            />

            <Button variant="outlined" component="label" startIcon={<CloudUploadIcon />}>
              Resim Seç
              <input
                hidden
                type="file"
                onChange={(e) => setForm({ ...form, resimFile: e.target.files?.[0] || null })}
              />
            </Button>
          </Stack>

          <TextField
            label="İçerik"
            required
            multiline
            rows={4}
            value={form.icerik}
            onChange={(e) => setForm({ ...form, icerik: e.target.value })}
          />

          <TextField
            label="Geçerlilik Tarihi"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
            value={form.gecerlilikTarihi}
            onChange={(e) => setForm({ ...form, gecerlilikTarihi: e.target.value })}
            inputProps={{
              min: (() => {
                const today = new Date();
                const yyyy = today.getFullYear();
                const mm = String(today.getMonth() + 1).padStart(2, "0");
                const dd = String(today.getDate()).padStart(2, "0");
                return `${yyyy}-${mm}-${dd}`; // YYYY-MM-DD formatı
              })(),
            }}
          />


          <Button variant="contained" size="large" onClick={handleSave} sx={{ py: 1.6, borderRadius: 3, fontWeight: 700 }}>
            {form.id ? "Güncelle" : "Kaydet"}
          </Button>
        </Stack>
      </Drawer>

      {/* SADECE EKLENEN DELETE MODAL */}
      <Dialog open={deleteId !== null} onClose={() => setDeleteId(null)} maxWidth="xs">
        <DialogContent sx={{ textAlign: "center", p: 4 }}>
          <WarningAmberIcon sx={{ fontSize: 60, color: "error.main", mb: 2 }} />
          <Typography variant="h5" fontWeight={700} mb={1}>
            Silme Onayı
          </Typography>
          <Typography color="text.secondary">
            Bu duyuruyu silmek istediğinize emin misiniz?
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

export default DuyuruManagement;
