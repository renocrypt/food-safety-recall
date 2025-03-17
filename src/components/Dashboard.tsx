// src/components/Dashboard.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchRecalls } from "../lib/api";
import { Recall } from "../types/recall";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SearchBar from "./SearchBar";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, error, refetch } = useQuery<any, Error>({
    queryKey: ["recalls", searchTerm], // Key is an array, so it depends on search
    queryFn: () => fetchRecalls(10, 0, searchTerm),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Food Safety Recalls</h1>
      <SearchBar onSearch={setSearchTerm} />

      <div className="my-4">
        <Button onClick={() => refetch()}>Refresh Data</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Firm</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Details</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.results.map((recall: Recall) => (
            <TableRow key={recall.recall_number}>
              <TableCell>{recall.recalling_firm}</TableCell>
              <TableCell>{recall.product_description}</TableCell>
              <TableCell>{recall.reason_for_recall}</TableCell>
              <TableCell>{recall.recall_initiation_date}</TableCell>
              <TableCell>
                <Link to={`/recalls/${recall.recall_number}`}>
                  <Button variant="link">View Details</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data?.meta.results.total === 0 && (
        <Card>
          <CardHeader>
            <CardTitle>No matching results.</CardTitle>
          </CardHeader>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
