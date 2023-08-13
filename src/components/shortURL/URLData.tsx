import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";

import { URL } from "../../types";
type Props = { urlData: URL };
export default function URLData({ urlData }: Props) {
  const { host, ip, pathname, hash, protocol, params } = urlData;
  return (
    <div>
      <TableContainer>
        <Table size="small">
          <TableBody>
            <TableRow>
              <TableCell>Host</TableCell>
              <TableCell>{host}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ minWidth: 100 }}>IP Address</TableCell>
              <TableCell>{ip}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Pathname</TableCell>
              <TableCell>
                <Typography style={{ wordBreak: "break-all" }}>
                  {pathname}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Hash</TableCell>
              <TableCell>
                <Typography style={{ wordBreak: "break-all" }}>
                  {hash}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Protocol</TableCell>
              <TableCell>{protocol}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Params</TableCell>
              <TableCell>
                <Typography style={{ wordBreak: "break-all" }}>
                  {params}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
