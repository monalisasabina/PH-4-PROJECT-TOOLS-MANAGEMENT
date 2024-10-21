import { useFormik } from "formik"
import * as Yup from "yup"

function StoreEmployeesForm({onAddStoreEmployee}){

    const formSchema = Yup.object().shape({

      name: Yup.string().required("Must enter a name"),
      role: Yup.string().required("Role is required")
    })

    const formik = useFormik({

      initialValues:{
        name: '',
        role: '',
      },

        validationSchema: formSchema,
        onSubmit: (values, {resetForm}) => {

          fetch(`http://127.0.0.1:5555/storeemployees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then((res) => res.json())
        .then((newStoreEmployee) => {
            onAddStoreEmployee(newStoreEmployee);
          
            // Reset the form after submission
            resetForm(); 
        })
      }
    })

    return(
        <>
          <form onSubmit={formik.handleSubmit} className="records_form">

             <div className="fields">
                 <label htmlFor="name">NAME</label>
                 <input onChange={formik.handleChange} id="name" value={formik.values.name} type="text" placeholder="Enter Employee Name"/>
                 <p style={{color: "red"}}> {formik.errors.name} </p>
             </div>

             <div className="fields">
                 <label htmlFor="role">ROLE</label>
                 <input onChange={formik.handleChange} id="role" value={formik.values.role} type="text" placeholder="Enter Employee's Role"/>
                 <p style={{color: "red"}}> {formik.errors.role} </p>
             </div>

             <button type="submit" >SUBMIT</button>

          </form>
        </>
    )

}

export default StoreEmployeesForm