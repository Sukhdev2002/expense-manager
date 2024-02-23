import React from "react";
import { useForm } from "react-hook-form";
import { createTask } from "../services/TaskService";

export default function CreateTask(props) {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data, e) => {
        createTask(data).then((response) => {
            props.taskCreated();
            e.target.reset();
        });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 mrgnbtm">
                    <h2>ToDo List</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="row mrgnbtm">
                            <div className="form-group col-md-4">
                                <label htmlFor="exampleInputEmail1">Breakfast</label>
                                <input
                                    {...register("breakfast")}
                                    placeholder="breakfast"
                                    className="form-control"
                                    name="breakfast"
                                    id="breakfast"
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="exampleInputPassword1">Lunch</label>
                                <input
                                    {...register("lunch")}
                                    placeholder="lunch"
                                    className="form-control"
                                    name="lunch"
                                    id="lunch"
                                />
                            </div>
                            <div className="form-group col-md-4">
                            <label htmlFor="exampleInputPassword1">Dinner</label>
                            <input
                                {...register("dinner")}
                                placeholder="dinner"
                                className="form-control"
                                name="dinner"
                                id="dinner"
                            />
                        </div>
                        </div>
                        <div className="row mrgnbtm">
                            <div className="form-group col-md-4">
                                <label htmlFor="exampleInputPassword1">Kiraya</label>
                                <input
                                    {...register("kiraya")}
                                    placeholder="kiraya"
                                    className="form-control"
                                    name="kiraya"
                                    id="kiraya"
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="exampleInputPassword1">Personal</label>
                                <input
                                    {...register("personal")}
                                    placeholder="personal"
                                    className="form-control"
                                    name="personal"
                                    id="personal"
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="exampleInputPassword1">Healthy Food</label>
                                <input
                                    {...register("healthy_food")}
                                    placeholder="healthy"
                                    className="form-control"
                                    name="healthy_food"
                                    id="healthy_food"
                                />
                            </div>
                        </div>
                        <div className="row mrgnbtm">
                        <div className="form-group col-md-4">
                            <label htmlFor="exampleInputPassword1">Special</label>
                            <input
                                {...register("special")}
                                placeholder="special"
                                className="form-control"
                                name="special"
                                id="special"
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="exampleInputPassword1">Other</label>
                            <input
                                {...register("other")}
                                placeholder="other"
                                className="form-control"
                                name="other"
                                id="other"
                            />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="exampleInputPassword1">Description</label>
                            <input
                                {...register("description")}
                                placeholder="description"
                                className="form-control"
                                name="description"
                                id="description"
                            />
                        </div>
                    </div>
                        <input type="submit" className="btn btn-danger mrgnbtm" />
                    </form>
                </div>
            </div>
        </div>
    );
}
