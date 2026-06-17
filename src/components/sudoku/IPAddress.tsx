import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Create type person
type Person = {
  id: number;
  first: string;
  last: string;
  phone: string;
  coords: string;
  picture: string;
};

// Create column headers for data grid
const dataGridColumnHeaders: GridColDef<Person>[] = [
  {
    field: "first",
    headerName: "First",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "last",
    headerName: "Last",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "phone",
    headerName: "Phone",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "coords",
    headerName: "Coordinates",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "picture",
    headerName: "Picture",
    flex: 1,
    align: "center",
    headerAlign: "center",
    // Render presons picture
    renderCell: (params: { row: { picture: string } }) => (
      <img src={params.row.picture} />
    ),
  },
];
export const IPAddress = () => {
  const [tableRows, setTableRows] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  // Get FAKE user data from API's
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await fetch(
          "https://randomuser.me/api/?results=50"
        );
        const userDataJson = await userResponse.json();
        setTableRows((prev) => {
          let copy = prev;
          userDataJson.results.forEach(
            (
              user: {
                name: { first: any; last: any };
                phone: any;
                location: { coordinates: { latitude: any; longitude: any } };
                picture: { thumbnail: any };
              },
              index: number
            ) => {
              copy.push({
                id: index,
                first: user.name.first,
                last: user.name.last,
                phone: user.phone,
                coords: `${user.location.coordinates.latitude} ${user.location.coordinates.longitude}`,
                picture: user.picture.thumbnail,
              });
            }
          );
          return copy;
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <DataGrid
      columns={dataGridColumnHeaders}
      rows={tableRows}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  );
};
