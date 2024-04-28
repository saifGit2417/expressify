import { useState } from "react";
import axios from "axios";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface Props {
  open: boolean;
  handleClose: () => void;
}

const AddToDo = (props: Props) => {
  const [toDoData, setToDoData] = useState({ title: "", description: "" });
  const getToken = localStorage.getItem("token");

  const handleAddToDo = (e: any) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3333/api/v1/todo/add",
        { ...toDoData },
        {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 200 || res.status === 201) {
          props.handleClose();
          setToDoData({ title: "", description: "" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add To-Do
          </Typography>
          <TextField
            fullWidth
            label="Title"
            variant="outlined"
            value={toDoData.title}
            onChange={(e) =>
              setToDoData({ ...toDoData, title: e.target.value })
            }
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={toDoData.description}
            onChange={(e) =>
              setToDoData({ ...toDoData, description: e.target.value })
            }
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToDo}
            sx={{ mt: 2 }}
          >
            Add To-Do
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddToDo;
