import { QueryClient, QueryClientProvider } from 'react-query';
import LineGraph from "./LineGraph"
const queryClient = new QueryClient();

function Graph() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="graph-div">
       <LineGraph/>
      </div>
    </QueryClientProvider>
  );
}

export default Graph;
