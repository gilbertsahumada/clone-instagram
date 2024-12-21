import { useQuery } from "@tanstack/react-query";
import { gql, request } from "graphql-request";
import CardPost from "@/components/feed/CardPost";

const query = gql`
  {
    likes(first: 5) {
      id
      postId
      user
      blockNumber
    }
    postAddeds(first: 5) {
      id
      postId
      uri
      description
      owner
    }
  }
`;
const url =
  "https://api.studio.thegraph.com/query/91138/posts-instagram/version/latest";

export default function App() {
  const { data, status } = useQuery<any>({
    queryKey: ["data"],
    async queryFn() {
      return await request(url, query);
    },
  });

  return (
    <div>
      {status === "pending" ? <div>Loading...</div> : null}
      {status === "error" ? (
        <div>Error ocurred querying the Subgraph</div>
      ) : null}
      <div>
        {data ? (
          data.postAddeds.map((post: any, key: number) => {
            return <CardPost post={post} key={key} />
          })
        ) : (
          <div>No posts found</div>
        )}
      </div>
    </div>
  );
}
