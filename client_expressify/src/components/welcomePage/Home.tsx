import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import {
  Button,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddToDo from "../addToDo/AddToDo";
interface JwtPayload {
  userId: number;
}
interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  userId: number;
}
interface SnackBar {
  open: boolean;
  description: string;
  severity: string;
}
const Home = () => {
  const [listOfToDos, setListOfToDos] = useState<any>();
  const [addToDo, setAddToDo] = useState<boolean>(false);
  const [snackBar, setSnackBar] = useState<SnackBar>({
    open: false,
    description: "",
    severity: "",
  });
  const getToken = localStorage.getItem("token");
  const decodeToken = jwtDecode(getToken ? getToken : "") as JwtPayload;

  const userId: any = decodeToken?.userId;

  const getAllUserToDos = (userId: number) => {
    axios
      .get(`http://localhost:3333/api/v1/todo/getAllToDos/${userId}`, {
        headers: {
          Authorization: `bearer ${getToken}`,
        },
      })
      .then((res) => {
        setListOfToDos(res.data.userToDos);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllUserToDos(userId);
  }, [addToDo, snackBar]);

  const handleAddToDo = () => {
    setAddToDo(true);
  };

  const handleDeleteToDo = (data: Task) => {
    console.log("data: ", data);
    axios
      .delete(`http://localhost:3333/api/v1/todo/delete/${data.id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setSnackBar((prev) => ({
            ...prev,
            open: true,
            description: "Task Deleted Successfully",
            severity: "danger",
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddToDo}
        sx={{ mt: 2 }}
      >
        Add To-Do
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfToDos?.map((data: Task, index: number) => {
              return (
                <TableRow>
                  <TableCell>{index + 1} </TableCell>
                  <TableCell>{data.title} </TableCell>
                  <TableCell>{data.description} </TableCell>
                  <TableCell>
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteToDo(data)}
                    >
                      <DeleteIcon />
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {addToDo && (
        <AddToDo
          open={addToDo}
          handleClose={() => {
            setAddToDo(false);
          }}
        />
      )}
      <Snackbar
        open={snackBar.open}
        autoHideDuration={2000}
        onClose={() => setSnackBar((prev) => ({ ...prev, open: false }))}
        message={snackBar.description}
      />
    </div>
  );
};

export default Home;
