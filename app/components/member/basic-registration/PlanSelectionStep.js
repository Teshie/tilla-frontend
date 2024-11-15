import React from "react";
import { Card, CardActionArea, CardMedia, Typography } from "@mui/material";

function PlanSelectionStep({ setPlanType }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      <Card onClick={() => setPlanType("Family")}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/path/to/family-image.jpg" // Replace with your family image path
            alt="Family Plan"
          />
          <Typography variant="h6" align="center">
            Family
          </Typography>
        </CardActionArea>
      </Card>

      <Card onClick={() => setPlanType("Individual")}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image="/path/to/individual-image.jpg" // Replace with your individual image path
            alt="Individual Plan"
          />
          <Typography variant="h6" align="center">
            Individual
          </Typography>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default PlanSelectionStep;
