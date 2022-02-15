import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { useState } from "react";

function CreateLightSaber() {
  const [alert, setAlert] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleClick = async (data) => {
    const body = {
      id: uuid(),
      name: data.name,
      available: parseInt(data.quantity),
      crystal: [
        {
          name: data.crystal,
          color: data.crystalColor,
        },
      ],
    };
    const json = JSON.stringify(body);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: json,
    };
    try {
      const response = await fetch(
        "https://localhost:7000/jedisabershop/saber",
        options
      );
      if (response.ok) {
        reset();
        setAlert("Light Saber Successfully Created");

        setTimeout(() => {
          setAlert("");
        }, 2000);
      }
    } catch (error) {
      setAlert("Something Went Wrong. Please Try Again!");
    }
  };

  return (
    <>
      <div className="create-saber">
        <form className="create-saber" onSubmit={handleSubmit(handleClick)}>
          <input
            type="text"
            className="input"
            placeholder="Enter Owner Name  ..."
            {...register("name", { required: "Please insert your Name" })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}

          <input
            type="text"
            className="input"
            placeholder="Enter Crystal Name  ..."
            {...register("crystal", { required: "Please insert Crystal name" })}
          />
          {errors.crystal && <p className="error">{errors.crystal.message}</p>}

          <select
            name="colors"
            id="colors"
            className="input select"
            {...register("crystalColor", {
              required: "Please select the crystal color",
            })}
          >
            <option value="">Select Crystal Color ...</option>
            <option value="red">red</option>
            <option value="green">green</option>
            <option value="blue">blue</option>
            <option value="purple">purple</option>
          </select>
          {errors.crystalColor && (
            <p className="error">{errors.crystalColor.message}</p>
          )}
          <input
            type="text "
            className="input"
            name="quantity"
            placeholder="Enter the quantity  ..."
            {...register("quantity", {
              required: "Please insert the crystal quantity",
            })}
          />
          {errors.quantity && (
            <p className="error">{errors.quantity.message}</p>
          )}

          <button className="submit-btn">Create Light Saber</button>
        </form>

        {alert && <h4 className="result">{alert}</h4>}
      </div>
    </>
  );
}

export default CreateLightSaber;
