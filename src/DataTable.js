import { useState, useRef } from "react";

const DataTable = () => {
  // tableData: An object to hold the form input values.
  // setTableData: Function to update tableData.

  const [tableData, setTableData] = useState({
    name: "",
    gender: "",
    age: "",
  });

  // data: An array to hold all table entries.
  // setData: Function to update data.

  const [data, setData] = useState([]);

  // editId: Stores the ID of the item being edited.
  // setEditId: Function to update editId.

  const [editId, SetEditId] = useState(null);

  // searchQuery: Stores the search input value.
  // setSearchQuery: Function to update searchQuery.

  const [searchQuery, setSearchQuery] = useState("");

  // Creating Ref for the input fields.
  // These refs are used to focus on the input fields.

  const inputNameRef = useRef(null);
  const inputGenderRef = useRef(null);
  const inputAgeRef = useRef(null);

  // Finds the item by ID and populates the form with its data for editing.
  // Sets editId to the item's ID and focuses on the name input.

  const handleEdit = (id) => {
    const itemToEdit = data.find((item) => item.id === id);
    if (itemToEdit) {
      setTableData({
        name: itemToEdit.name,
        gender: itemToEdit.gender,
        age: itemToEdit.age,
      });
      SetEditId(id);
      inputNameRef.current.focus();
    }
  };

  // Updates the tableData state as the user types in the form.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTableData({ ...tableData, [name]: value });
  };

  // Adds a new item or updates an existing one.
  // Clears the form after adding or updating.

  const handleAdd = () => {
    if (tableData.name && tableData.gender && tableData.age) {
      if (editId) {
        setData(
          data.map((item) =>
            item.id === editId ? { ...item, ...tableData } : item
          )
        );
        SetEditId(null);
      } else {
        const newItem = {
          id: Date.now(),
          name: tableData.name,
          gender: tableData.gender,
          age: tableData.age,
        };
        setData([...data, newItem]);
      }
      setTableData({ name: "", gender: "", age: "" });
    }
  };

  // Deletes an item by filtering it out of the data array.

  const handleDelete = (id) => {
    const removeUpdatedList = data.filter((item) => item.id !== id);
    setData(removeUpdatedList);
  };

  // Updates the searchQuery state as the user types in the search input.

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filters data based on the search query.

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.gender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.age.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="container">
      <div className="input-box">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={tableData.name}
          onChange={handleChange}
          ref={inputNameRef}
        />
        <input
          type="text"
          name="gender"
          placeholder="Gender"
          value={tableData.gender}
          onChange={handleChange}
          ref={inputGenderRef}
        />
        <input
          type="text"
          name="age"
          placeholder="Age"
          value={tableData.age}
          onChange={handleChange}
          ref={inputAgeRef}
        />
      </div>
      <button className="btn" onClick={handleAdd}>
        {editId ? "Update" : "Add"}
      </button>
      <div className="search-box">
        <input
          type="text"
          name="search"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      <table border={2} width={350}>
      <thead>
            <tr>
              <td>Name</td>
              <td>Gender</td>
              <td>Age</td>
              <td>Action</td>
            </tr>
          </thead>
      {filteredData.map((item) => (
          <tbody>
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.gender}</td>
              <td>{item.age}</td>
              <td>
                <button id="edit-btn" onClick={() => handleEdit(item.id)}>
                  Edit
                </button>
                <button id="del-btn" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
      ))}
      </table>
    </div>
  );
};

export default DataTable;
