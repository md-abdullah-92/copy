export const useRoleSelection = (form: any) => {
    const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      form.setFieldValue('role', event.target.value);
    };
  
    return { handleRoleChange };
  };
  