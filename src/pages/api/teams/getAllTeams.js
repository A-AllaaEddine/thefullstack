import axios from 'axios';
import { withAuthUserTokenAPI } from '../auth/withAuthUserTokenAPI';
import initAuth from '../../../firebase/initFirebaseApp';

initAuth();

const handler = async (req, res, AuthUser) => {
  const accessToken = await AuthUser?.getIdToken();
  const requestURL = `${process.env.API_TEAMS_URL}/teams/all?page=${req.query.page}`;

  let headers = '';
  if (accessToken) {
    headers = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  }

  return axios
    .get(requestURL, headers)
    .then((response) => {
      res.status(response.status).json(response.data);
    })
    .catch((error) => {
      res.status(error.response.status).json(error.response.data);
    });
};

export default withAuthUserTokenAPI(handler, true);
