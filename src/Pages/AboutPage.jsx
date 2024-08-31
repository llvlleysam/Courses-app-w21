import { Link, Paper, Stack, Toolbar, Typography } from "@mui/material";
import TelegramIcon from '@mui/icons-material/Telegram';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MapComponent from "../Components/map/MapComponent";

export default function AboutPage() {
  return (
    <div style={{height:"100vh", display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
      <Toolbar/>
      <Paper elevation={20} style={{width:"700px", padding:"20px", borderRadius:"15px", display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"20px"}}>
        <Typography fontSize={15} fontWeight={"bold"}>راه های ارتباطی</Typography>
        <Stack display={"flex"} direction={"row"} spacing={2}>
        <Typography fontWeight={"bold"}>نشانی:</Typography>
        <Typography>تهران - ابتدای اتوبان امام علی - بلوار ارتش</Typography>
        </Stack>
        <Stack display={"flex"} direction={"row"} spacing={2}>
        <Link href="https://t.me/messi_x" target="_blank"><TelegramIcon fontSize="large"/></Link>
        <Link href="https://www.instagram.com/llvlleysam?igsh=dGdnNDR3NThqY2R6" target="_blank"><InstagramIcon  fontSize="large"/></Link>
        <Link href="https://wa.me/989192963164?text=Hello!%20I%20want%20to%20contact%20you." target="_blank"><WhatsAppIcon  fontSize="large"/></Link>
        </Stack>
         <MapComponent/>

      </Paper>
    </div>
  )
}
