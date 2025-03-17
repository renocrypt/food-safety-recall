// src/components/RecallDetails.tsx
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchRecalls } from "../lib/api";
import { Recall } from "../types/recall";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RecallDetails = () => {
  const { recallNumber } = useParams<{ recallNumber: string }>();

  const { data, isLoading, error } = useQuery<any, Error>({
    queryKey: ["recall", recallNumber],
    queryFn: () => fetchRecalls(1, 0, `recall_number:${recallNumber}`), // Search by recall number
    enabled: !!recallNumber,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const recall = data?.results[0] as Recall;
  if (!recall) return <div>Recall not found.</div>;

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>{recall.recalling_firm}</CardTitle>
          <CardDescription>{recall.product_description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Reason:</strong> {recall.reason_for_recall}
          </p>
          <p>
            <strong>Initiation Date:</strong> {recall.recall_initiation_date}
          </p>
          <p>
            <strong>Status:</strong> {recall.status}
          </p>
          <p>
            <strong>Classification:</strong> {recall.classification}
          </p>
          <p>
            <strong>Distribution:</strong> {recall.distribution_pattern}
          </p>
          {/* Display other relevant details */}
        </CardContent>
        <CardFooter>
          <p>Recall Number: {recall.recall_number}</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RecallDetails;
