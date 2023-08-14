import { Card, CardContent, Typography } from "@mui/material";
import { historyData } from "../../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ShortURLAlert from "../common/ShortURLAlert";
dayjs.extend(relativeTime);

const SingleHistoryCard = (props: { data: historyData }) => {
  const { url, documents, createdAt } = props.data;
  return (
    <Card sx={{ m: 1 }}>
      <CardContent>
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ wordWrap: "break-word" }}
        >
          {url.href}
        </Typography>
        {documents.map((urlDocument) => (
          <ShortURLAlert url={urlDocument} key={urlDocument._id} />
        ))}
        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{ textAlign: "right" }}
        >
          {dayjs(createdAt).fromNow()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SingleHistoryCard;
