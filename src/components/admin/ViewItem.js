import { FormatListBulleted } from '@mui/icons-material';
import { Button, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const ViewItem = () => {
   const navigateTo = useNavigate();
   const { id } = useParams();
   const state = useSelector((state) => state.users);
   const { address, category, info, contact, date, image, location, place, title, price } = state.filter((i) => i.id === +id)[0];

   return (
      <div>
         <Button
            variant="contained"
            startIcon={<FormatListBulleted />}
            onClick={() => {
               navigateTo('/admin/elyor');
            }}
            type="primary"
            size="large"
         >
            List of Users
         </Button>
         <div className="py-10 flex justify-center">
            <Card sx={{ maxWidth: '600px' }}>
               <CardActionArea>
                  <CardMedia
                     component="img"
                     image={`http://f0607823.xsph.ru/elyor/public/storage/event/${id}/${id}.jpg`}
                     alt="green iguana"
                  />
                  <CardContent>
                     <Typography gutterBottom variant="h3" component="div">
                        {`ID ==========: ${id}`}
                     </Typography>
                     <Typography gutterBottom variant="h5" component="div">
                        Title ============================== <br />{title}
                     </Typography>
                     <Typography gutterBottom variant="h5" component="div">
                        Category ============================== <br />{category}
                     </Typography>
                     <Typography gutterBottom variant="h5" component="div">
                        Info ============================== <br />{info}
                     </Typography>
                     <Typography gutterBottom variant="h5" component="div">
                        Date ============================== <br />{date}
                     </Typography>
                     <Typography gutterBottom variant="h5" component="div">
                        Contact ============================== <br />{contact}
                     </Typography>
                     <Typography gutterBottom variant="h5" component="div">
                        Address ============================== <br />{address}
                     </Typography>
                     <Typography gutterBottom variant="h5" component="div">
                        Place ============================== <br />{place}
                     </Typography>
                     <Typography gutterBottom variant="h5" component="div">
                        Location ============================== <br />{location}
                     </Typography>
                     <Typography gutterBottom variant="h5" component="div">
                        Price ============================== <br />{price}
                     </Typography>
                  </CardContent>
               </CardActionArea>
            </Card>
         </div>
      </div>
   );
};

export default ViewItem;
