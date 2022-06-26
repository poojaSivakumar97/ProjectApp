import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { ADD_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";

const AddClientModal = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [addClient] = useMutation(ADD_CLIENT, {
    variables: {
      name,
      email,
      phone,
    },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { clients: [...clients, addClient] },
      });
    },
  });
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === "" || email === "" || phone === "") {
      return alert("Please fill in all fields");
    }
    addClient(name, email, phone);

    setName("");
    setEmail("");
    setPhone("");
  };
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addClientModal"
      >
        <div className="d-flex align-items-center">
          <FaUser className="icon" />
          <div>Add Client</div>
        </div>
      </button>

      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="addClientModal"
        tabindex="-1"
        aria-labelledby="addClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addClientModalLabel">
                New Client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label htmlFor="form-label">Name</label>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label htmlFor="form-label">Email</label>
                  <input
                    className="form-control"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="form-label">Phone</label>
                  <input
                    className="form-control"
                    type="text"
                    id="name"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-secondary"
                  type="submit"
                  data-bs-dismiss="modal"
                >
                  submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddClientModal;
