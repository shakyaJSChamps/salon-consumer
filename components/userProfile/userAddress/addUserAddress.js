import { addAddressSchema } from '@/utils/schema';
import { addAddress } from '@/api/account.api';
import Notify from '@/utils/notify'
import FormPopup from '@/components/formPopup/formPopup';

const AddUserAddress = (props) => {
    const {updatedData}=props
    const initialValues = {
        streetAddress: '',
        houseNo: '',
        landmark: '',
        latitude: '',
        longitude: '',
        pincode: '',
        city: '',
        state: '',
        country: ''
    }
    const handleSubmit =async (values) => {
        try {
            const res =await addAddress(values) 
            //   e.preventDefault();
            console.log("resAddress--->",res)
            Notify.success(res?.data?.message)
            props.onHide(); // Close modal after form submission
            updatedData();
        } catch (error) {
            Notify.error(error.message)
        }
        
    }
    return (
       <FormPopup
       title="Add Address"
       btn="Save"
       show={props.show}
       onHide={props.onHide}    
       handleSubmit={handleSubmit}  
       initialValues={initialValues}
       validationSchema={addAddressSchema}
       />
    );
};

export default AddUserAddress;
