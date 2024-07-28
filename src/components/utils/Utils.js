import { postData, fetchData, deleteData, updateData } from '../../services/http-service';
import { notification } from 'antd';

export const handleDeleteRecord = async (recordName, endpoint, recordId) => {
    try {
        const response = await deleteData(`/api/${endpoint}/${recordId}`);
        if (response.status === 200) {
            console.log(`${recordName} deleted successfully`);
            return true;
        } else {
            console.error(`Failed to delete ${recordName}:`, response.statusText);
            return false;
        }
    } catch (error) {
        console.error(`Error deleting ${recordName}:`, error);
    }
}

//record should be passed as schema format
export const handleUpdateRecord = async (recordName, endpoint, record, recordId) => {
    try {
        const response = await updateData(`/api/${endpoint}/${recordId}`, JSON.stringify(record));
        if (response.status === 200) {
            console.log(`${recordName} updated successfully`);
            return true;
        } else {
            console.error(`Failed to update ${recordName}:`, response.statusText);
            return false;
        }
    } catch (error) {
        console.error(`Error updating ${recordName}:`, error);
    }
};

export const handleAddRecord = async (endpoint, newRecord) => {
    try {
        const response = await postData(`/api/${endpoint}`, JSON.stringify(newRecord));
        if (response.status === 201) {
            console.log('Category added successfully');
            return true;
        } else {
            console.error('Failed to add category:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Error adding category:', error);
    }
};

export const passwordReset = async (values) => {
    try {
        const response = await postData(`/api/users/forgot-password`, JSON.stringify(values));
        if (response.status === 200) {
            console.log('password updated successfully');
            notification.info({
                message: 'Successfully updated password',
                description: "Your password has been updated successfully"
            });
            return true;
        } else {
            console.error('Failed to updating password:');
            notification.error({
                message: 'Password reseting Failed',
                description: "Your password is Not updated"
            });
            return false;
        }

    } catch (error) {
        console.error('Error updating password:', error);
    }
}