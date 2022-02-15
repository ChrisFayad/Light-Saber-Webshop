import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import sendXML from "../utils/sendXML";

function Padawan() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClick = async (data) => {
    if (data.file[0]) {
      const name = data.file[0].name;
      const reader = new FileReader();
      reader.readAsText(data.file[0]);
      reader.onload = function (e) {
        const xml = e.target.result;
        sendXML(xml, name);
      };
    }
    const padawanName = data.name;
    const padawanAge = data.age;
    navigate("/Padawan/saber-shopping", {
      state: { padawanName: padawanName, padawanAge: padawanAge },
    });
  };

  return (
    <div className="create-padawan">
      <form className="create-padawan">
        <h2> Upload Your File</h2>
        <input
          type="file"
          name="xml-upload"
          id="xml"
          accept=".xml"
          style={{ display: "none" }}
          {...register("file")}
        />
        {errors.file && <p className="error">{errors.file.message}</p>}
        <label htmlFor="xml" className="upload-file">
          Upload XML File
        </label>
        <input
          type="text"
          placeholder="Enter the padawan name ..."
          className="input"
          {...register("name", { required: "Please insert your Name" })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
        <input
          type="number"
          placeholder="Enter the padawan age ..."
          className="input"
          {...register("age", { required: "Please insert your age" })}
        />
        {errors.age && <p className="error">{errors.age.message}</p>}
        <button className="submit-btn" onClick={handleSubmit(handleClick)}>
          Next
        </button>
      </form>
    </div>
  );
}

export default Padawan;
