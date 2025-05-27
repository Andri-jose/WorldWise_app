import { useLocation } from "react-router-dom";



export default function PageNotFound() {

  const location = useLocation();

  console.log("404 - Page not found for path:", location.pathname);


  return (
    <div>
      <h1>Page not found 😢</h1>
    </div>
  );
}
