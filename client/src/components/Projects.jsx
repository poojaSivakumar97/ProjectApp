import { GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./Spinner";
import { useQuery } from "@apollo/client";
import ProjectCard from "./ProjectCard";

const Projects = () => {
  const { loading, error, data } = useQuery(GET_PROJECTS);
  if (loading) return <Spinner />;
  if (error) return <p>something went wrong..</p>;
  return (
    <>
      <h4 className="heading">Projects</h4>
      {data.projects.length > 0 ? (
        <div className="row mt-5">
          {data.projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <p>No Projects</p>
      )}
    </>
  );
};

export default Projects;
