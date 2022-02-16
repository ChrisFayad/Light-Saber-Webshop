import { Button, Stack } from "@mui/material/";
import Typewriter from "typewriter-effect";

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
        <Button variant="contained" href="/JediMaster/display-lightsabers">
          Display Lightsabers
        </Button>
        <Button variant="contained" href="/JediMaster/display-orders">
          Display Orders
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="center" mt={30} className="quote">
        <Typewriter
          options={{
            strings: ["May The Force Be With You!"],
            autoStart: true,
            loop: true,
          }}
        />
      </Stack>
    </>
  );
}

export default JediMaster;
