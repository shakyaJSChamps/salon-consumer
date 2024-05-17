import { addAddressSchema } from '@/utils/schema';
import { UpdateAddress, addAddress } from '@/api/account.api';
import Notify from '@/utils/notify'
import FormPopup from '@/components/formPopup/formPopup';

const UpdateUserAddress = (props) => {
    const data=props.data;
    console.log("data===>",data);
    const initialValues = {
        streetAddress: data?.streetAddress || '',
        houseNo: data?.houseNo || '',
        landmark: data?.landmark || '',
        latitude: data?.latitude || '',
        longitude: data?.longitude || '',
        pincode: data?.pincode || '',
        city: data?.city || '',
        state: data?.state || '',
        country: data?.country || ''
    }
    const handleSubmit =async (values) => {
        try {
            const res =await UpdateAddress(values,data.id) 
            //   e.preventDefault();
            console.log("resAddress--->",res)
            Notify.success(res?.data?.message)
            props.onHide(); // Close modal after form submission
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

export default UpdateUserAddress;
