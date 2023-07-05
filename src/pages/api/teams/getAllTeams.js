import axios from "axios";
import initAuth from "../../../firebase/initFirebaseApp";

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser?.getIdToken();
  const requestURL = `${process.env.API_TEAMS_URL}/teams/all?page=${req.query.page}&size=30`;

  if (accessToken) {
    return axios
      .get(requestURL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        res.status(response.status).json(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).json(error.response.data);
      });
  } else {
    return axios
      .get(requestURL)
      .then((response) => {
        res.status(response.status).json(response.data);
      })
      .catch((error) => {
        res.status(error.response.status).json(error.response.data);
      });
  }
};

export default handler;
