import React, { useState, useContext, useEffect } from "react";
import Navbar from "../components/Navbar";
import DataTable from "react-data-table-component";
import CustomModal from "../components/CustomModal";
import { AppContext } from "../context";
import { get, add, update, delete_ } from "../context/actions";
import { ADD_CAR, ADD_CATEGORY, GET_CATEGORY, GET_CAR, DELETE_CATEGORY, DELETE_CAR, EDIT_CATEGORY, EDIT_CAR } from "../context/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";

const Home = () => {
	const { globalState, dispatch } = useContext(AppContext);

	const [categoryData, setCategoryData] = useState([]);
	const [carData, setCarData] = useState([]);
	const [loading, setLoading] = useState(false);
	const [formType, setFormType] = useState({ form: "categoryForm", title: "Add Category", update: false });

	const [categoryForm, setCategoryForm] = useState({
		category: "",
	});
	const [carForm, setCarForm] = useState({
		categoryId: "",
		name: "",
		model: "",
		make: "",
		color: "",
		registrationNo: "",
	});

	const [totalCategoryRows, setTotalCategoryRows] = useState(0);
	const [totalCarRows, setTotalCarRows] = useState(0);

	const [perPage, setPerPage] = useState(10);

	const [show, setShow] = useState(false);
	const handleClose = () => {
		setShow(false);
	};
	const handleShow = (type, title, data) => {
		setShow(true);
		setFormType({ form: type, title: title, update: data ? true : false });

		if (data && type === "categoryForm") {
			setCategoryForm({
				category: data.category,
				_id: data._id,
			});
		}

		if (data && type === "carForm") {
			setCarForm({
				categoryId: data.categoryId,
				name: data.name,
				color: data.color,
				make: data.make,
				model: data.model,
				registrationNo: data.registrationNo,
				_id: data._id,
			});
		}
	};

	const category_columns = [
		{
			name: "Category",
			selector: (row) => row.category,
			sortable: true,
		},
		{
			name: "Actions",
			cell: (row, index, column, id) => {
				return (
					<div>
						<button
							onClick={() => {
								delete_("/category", row._id, dispatch, DELETE_CATEGORY);
								fetchCategories(1);
							}}
							className="btn btn-danger">
							<FontAwesomeIcon icon={faTrashAlt} />
						</button>
						<button
							onClick={() => {
								handleShow("categoryForm", "Update Category", row);
							}}
							className="btn btn-warning">
							<FontAwesomeIcon icon={faEdit} />
						</button>
					</div>
				);
			},
		},
	];

	const car_columns = [
		{
			name: "Name",
			selector: (row) => row.name,
			sortable: true,
		},
		{
			name: "Model",
			selector: (row) => row.model,
			sortable: true,
		},
		{
			name: "Color",
			selector: (row) => row.color,
			sortable: true,
		},
		{
			name: "Make",
			selector: (row) => row.make,
			sortable: true,
		},
		{
			name: "Registration No",
			selector: (row) => row.registrationNo,
		},
		{
			name: "Category",
			cell: (row) => {
				if (globalState.categories.filter((category) => category._id === row.categoryId).length > 0 && globalState.categories.filter((category) => category._id === row.categoryId)[0].category) {
					return globalState.categories.filter((category) => category._id === row.categoryId)[0].category;
				} else {
					return row.categoryId;
				}
			},
		},
		{
			name: "Actions",
			cell: (row, index, column, id) => {
				return (
					<div>
						<button
							onClick={() => {
								delete_("/car", row._id, dispatch, DELETE_CAR);
								fetchCars(1);
							}}
							className="btn btn-danger">
							<FontAwesomeIcon icon={faTrashAlt} />
						</button>
						<button
							onClick={() => {
								handleShow("carForm", "Update Car", row);
							}}
							className="btn btn-warning">
							<FontAwesomeIcon icon={faEdit} />
						</button>
					</div>
				);
			},
		},
	];

	const fetchCategories = async (page) => {
		setLoading(true);
		page = globalState.category_next?.page ? globalState.category_next.page : page;
		let limit = globalState.category_next?.limit ? globalState.category_next.limit : 10;
		get(`/categories?page=${page}&limit=${limit}`, dispatch, GET_CATEGORY);
		setLoading(false);
	};

	const handlePageChangeCategory = (page) => {
		fetchCategories(page);
	};

	const handlePerRowsChangeCategory = async (newPerPage, page) => {
		setLoading(true);
		page = globalState.category_next?.page ? globalState.category_next?.page : page;
		let limit = globalState.category_next?.limit ? globalState.category_next?.limit : 10;
		get(`/categories?page=${page}&limit=${newPerPage}`, dispatch, GET_CATEGORY);
		setPerPage(newPerPage);
		setLoading(false);
	};

	const fetchCars = async (page) => {
		setLoading(true);
		page = globalState.car_next?.page ? globalState.car_next?.page : page;
		let limit = globalState.car_next?.limit ? globalState.car_next?.limit : 10;
		get(`/cars?page=${page}&limit=${perPage}`, dispatch, GET_CAR);
		setLoading(false);
	};

	const handlePageChangeCar = (page) => {
		fetchCars(page);
	};

	const handlePerRowsChangeCar = async (newPerPage, page) => {
		setLoading(true);
		page = globalState.car_next?.page ? globalState.car_next?.page : page;
		let limit = globalState.car_next?.limit ? globalState.car_next?.limit : 10;
		get(`/cars?page=${page}&limit=${newPerPage}`, dispatch, GET_CAR);
		setPerPage(newPerPage);
		setLoading(false);
	};

	useEffect(() => {
		fetchCategories();
		fetchCars();
	}, []);

	useEffect(() => {
		setCarData(globalState.cars);
		setCategoryData(globalState.categories);

		if (globalState.car_next && globalState.car_next.total) {
			setTotalCarRows(globalState.car_next.total);
		}
		if (globalState.category_next && globalState.category_next.total) {
			setTotalCategoryRows(globalState.category_next.total);
		}
	}, [globalState.categories, globalState.cars]);
	const handleInputChange = (form, e) => {
		const { name, value } = e.target;
		if (form === "categoryForm") {
			setCategoryForm((prevState) => {
				return {
					...prevState,
					[name]: value,
				};
			});
		} else {
			setCarForm((prevState) => {
				return {
					...prevState,
					[name]: value,
				};
			});
		}
	};
	const handleSave = () => {
		if (formType.form === "categoryForm") {
			add("/category", categoryForm, dispatch, ADD_CATEGORY);
			fetchCategories(1);
			setShow(false);
			setCategoryForm({
				category: "",
			});
		} else {
			add("/car", carForm, dispatch, ADD_CAR);
			fetchCars(1);
			setShow(false);
			setCarForm({
				categoryId: "",
				name: "",
				model: "",
				make: "",
				color: "",
				registrationNo: "",
			});
		}
	};
	const handleUpdate = () => {
		if (formType.form === "categoryForm" && formType.update) {
			const { _id, ...rest } = categoryForm;
			update("/category", _id, rest, dispatch, EDIT_CATEGORY);
			fetchCategories(1);
			setShow(false);
			setCategoryForm({
				category: "",
			});
		}

		if (formType.form === "carForm" && formType.update) {
			const { _id, ...rest } = carForm;
			update("/car", _id, rest, dispatch, EDIT_CAR);
			fetchCars(1);
			setShow(false);
			setCarForm({
				categoryId: "",
				name: "",
				model: "",
				make: "",
				color: "",
				registrationNo: "",
			});
		}
	};
	return (
		<div>
			<Navbar />
			{globalState.error && <p style={{ color: "red", fontWeight: "bold", fontSize: "18px", textAlign: "center", padding: "10px", width: "50%", margin: "10px auto", border: "1px solid red" }}>{globalState.error}</p>}
			<CustomModal title={formType.title} handleSave={formType.update ? handleUpdate : handleSave} handleClose={handleClose} handleShow={handleShow} show={show}>
				{formType.form === "categoryForm" ? (
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Category Name</Form.Label>
							<Form.Control name="category" value={categoryForm.category} onChange={(e) => handleInputChange("categoryForm", e)} type="text" placeholder="BMW" />
						</Form.Group>
					</Form>
				) : (
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Car Name</Form.Label>
							<Form.Control name="name" value={carForm.name} onChange={(e) => handleInputChange("carForm", e)} type="text" />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Car Color</Form.Label>
							<Form.Control type="text" name="color" value={carForm.color} onChange={(e) => handleInputChange("carForm", e)} />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Car Make</Form.Label>
							<Form.Control name="make" value={carForm.make} onChange={(e) => handleInputChange("carForm", e)} type="text" />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Car Model</Form.Label>
							<Form.Control name="model" value={carForm.model} onChange={(e) => handleInputChange("carForm", e)} type="text" />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Car Registration No</Form.Label>
							<Form.Control name="registrationNo" value={carForm.registrationNo} onChange={(e) => handleInputChange("carForm", e)} type="text" />
						</Form.Group>
						<Form.Select
							value={carForm.categoryId}
							onChange={(e) => {
								const categoryId = e.target.value;
								setCarForm((prevState) => {
									return {
										...prevState,
										categoryId: categoryId,
									};
								});
							}}>
							{globalState.categories.map((category) => (
								<option key={category._id} value={category._id}>
									{category.category}
								</option>
							))}
						</Form.Select>
					</Form>
				)}
			</CustomModal>
			<div className="container-fluid mt-4">
				<div className="row">
					<div className="col-sm-4">
						<h2>Categories</h2>
						<button onClick={() => handleShow("categoryForm", "Add Category")} className="btn btn-primary">
							Add New Category
						</button>
						<DataTable columns={category_columns} data={categoryData} pagination progressPending={loading} paginationServer paginationTotalRows={totalCategoryRows} onChangeRowsPerPage={handlePerRowsChangeCategory} onChangePage={handlePageChangeCategory} />
					</div>
					<div className="col-sm-8">
						<h2>Cars</h2>
						<button onClick={() => handleShow("carForm", "Add Car")} className="btn btn-primary">
							Add New Car
						</button>
						<DataTable columns={car_columns} data={carData} pagination progressPending={loading} paginationServer paginationTotalRows={totalCarRows} onChangeRowsPerPage={handlePerRowsChangeCar} onChangePage={handlePageChangeCar} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
