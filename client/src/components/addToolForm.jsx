import * as Yup from "yup"
import {useFormik} from "formik"

function AddToolForm({onAddTool}){

    const formSchema =Yup.object().shape({
        name: Yup.string().required("Must enter a name"),
        brand: Yup.string().required("Brand is required"),
        no_of_tools: Yup.number().required("No of tools required"),
        image: Yup.string().required("Image is required")
    })

    const formik = useFormik({

        initialValues:{
            name:'',
            brand:'',
            no_of_tools:'',
            image:'', 
        },

        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {

          const toolData = {
            ...values, 
            available_tools: values.no_of_tools,
          }  

          fetch(`http://127.0.0.1:5555/tools`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(toolData),
        })
        .then((res) => res.json())
        .then((newTool) => {
            onAddTool(newTool);
          
            // Reset the form after submission
            resetForm(); 

            console.log(newTool)
        })
      }
    })

    return(

        <>
          <form className="add_tools_form" onSubmit={formik.handleSubmit}>

            <div className="fields">
                <label htmlFor="name">NAME:</label>
                <input onChange={formik.handleChange} id="name" value={formik.values.name} type="text" placeholder="Enter Tool Name"/>
                <p style={{color: "red"}}> {formik.errors.name} </p>
            </div>

            <div className="fields">
                <label htmlFor="brand">BRAND:</label>
                <input onChange={formik.handleChange} id="brand" value={formik.values.brand} type="text" placeholder="Enter Tool's Brand"/>
                <p style={{color: "red"}}> {formik.errors.brand} </p>
            </div>

            <div className="fields">
                <label htmlFor="image">IMAGE:</label>
                <input onChange={formik.handleChange} id="image" value={formik.values.image} type="text" placeholder="Enter Tool Name"/>
                <p style={{color: "red"}}> {formik.errors.image} </p>
            </div>

            <div className="fields">
                <label htmlFor="no_of_tools">NO. OF TOOLS BOUGHT:</label>
                <input onChange={formik.handleChange} id="no_of_tools" value={formik.values.no_of_tools} type="number" placeholder="Enter Total Number of Tools"/>
                <p style={{color: "red"}}> {formik.errors.no_of_tools} </p>
            </div>

          

            <button type="submit">SUBMIT</button>
          </form>
        </>
    )
}

export default AddToolForm