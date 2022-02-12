import { Button, Stack } from "@mui/material/";

function JediMaster() {
  return (
    <>
      <Stack
        spacing={10}
        direction="row"
        justifyContent="center"
        alignItems="center"
        mt={20}
      >
        <Button variant="contained" href="/JediMaster/create-lightsaber">
          Create New Lightsaber
        </Button>
        <Button variant="contained" href="/JediMaster/display-orders">
          Display Orders
        </Button>
      </Stack>
    </>
  );
}

export default JediMaster;
