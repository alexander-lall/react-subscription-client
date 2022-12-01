import { Fragment, useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import PlanCard from "../../components/plan-card/plan-card.component";

import { UserContext } from "../../context/user";

const Home = () => {
  const [user, setUser] = useContext(UserContext);
  const { navigate } = useNavigate();
  const [monthlyPrices, setMonthlyPrices] = useState();
  const [annualPrices, setAnnualPrices] = useState();
  const [noSubPrices, setNoSubPrices] = useState();
  const [userSubscriptions, setUserSubscriptions] = useState();
  const [tabValue, setTabValue] = useState("0");

  useEffect(() => {
    const fetchPrices = async () => {
      const { data } = await axios.get("/prices");

      let tempMonthlyPrices = [];
      let tempAnnualPrices = [];
      let tempNoSubPrices = [];

      data.forEach((price) => {
        if (price.recurring != null && price.recurring.interval === "month") {
          tempMonthlyPrices[tempMonthlyPrices.length] = price;
        } else if (
          price.recurring != null &&
          price.recurring.interval === "year"
        ) {
          tempAnnualPrices[tempMonthlyPrices.length] = price;
        } else {
          tempNoSubPrices[tempMonthlyPrices.length] = price;
        }
      });

      setMonthlyPrices(tempMonthlyPrices);
      setAnnualPrices(tempAnnualPrices);
      setNoSubPrices(tempNoSubPrices);
    };
    fetchPrices();
  }, []);

  useEffect(() => {
    let result = [];
    user?.user?.subscriptions?.forEach((sub) => {
      result.push(sub.plan.id);
    });
    setUserSubscriptions(result);
  }, [user, user.token]);

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  };

  const handleSubscription = async (e, price) => {
    e.preventDefault();
    if (user && user.token) {
      const { data } = await axios.post("/create-subscription", {
        priceId: price.id,
      });
      window.open(data);
    } else {
      navigate('/register');
    }
  };

  return (
    <Fragment>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" component="h1">
          Brainssistance
        </Typography>
      </Container>

      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TabContext value={tabValue}>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <TabList value={tabValue} onChange={handleTabChange} centered>
              <Tab label="Monatlich" value="0" />
              <Tab label="Jährlich" value="1" />
              <Tab label="Einmalig" value="2" />
            </TabList>
          </Box>
          <TabPanel value="0">
            <Stack direction={"row"} spacing={4}>
              {monthlyPrices &&
                monthlyPrices.map((price) => (
                  <PlanCard
                    key={price.id}
                    price={price}
                    handleSubscription={handleSubscription}
                    userSubscriptions={userSubscriptions}
                  />
                ))}
            </Stack>
          </TabPanel>
          <TabPanel value="1">
            <Stack direction={"row"} spacing={4}>
              {annualPrices &&
                annualPrices.map((price) => (
                  <PlanCard
                    key={price.id}
                    price={price}
                    handleSubscription={handleSubscription}
                    userSubscriptions={userSubscriptions}
                  />
                ))}
            </Stack>
          </TabPanel>
          <TabPanel value="2">
            <Stack direction={"row"} spacing={4}>
              {noSubPrices &&
                noSubPrices.map((price) => (
                  <PlanCard
                    key={price.id}
                    price={price}
                    handleSubscription={handleSubscription}
                    userSubscriptions={userSubscriptions}
                  />
                ))}
            </Stack>
          </TabPanel>
        </TabContext>
      </Container>
    </Fragment>
  );
};

export default Home;
