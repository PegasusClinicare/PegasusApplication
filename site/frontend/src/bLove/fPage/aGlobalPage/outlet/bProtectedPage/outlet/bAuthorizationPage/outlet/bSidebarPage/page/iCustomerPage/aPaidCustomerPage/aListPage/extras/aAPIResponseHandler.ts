import { Bounce, toast } from "react-toastify";


const apiResponseHandler = {
  listAPIResponseHandler: (listAPIResponse: any) => {
    // Handle loading
    if (listAPIResponse.isLoading) return;
    console.log(listAPIResponse)

    // Handle error
    if (listAPIResponse.isError) {
      if (listAPIResponse.error && listAPIResponse.error.originalStatus === 404) {
        return toast.error(("There was a problem with server connection."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // toast({
        //   variant: "destructive",
        //   title: "Uh oh! Cannot connect with server.",
        //   description: "There was a problem with server connection.",
        // });
      } else if (listAPIResponse.error && listAPIResponse.error?.data?.success === false) {
        return toast.error((listAPIResponse.error?.data.message || "There was an error."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // toast({
        //   variant: "destructive",
        //   title: "Uh oh! Something went wrong.",
        //   description: listAPIResponse.error?.data.message || "There was an error.",
        // });
      } else {
        return toast.error(("An unexpected error occurred."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // toast({
        //   variant: "destructive",
        //   title: "Error",
        //   description: "An unexpected error occurred.",
        // });
      }
      return;
    }
    console.log(listAPIResponse)

    // Handle success
    if (listAPIResponse.isSuccess && listAPIResponse.data?.success) {
      return toast.success((listAPIResponse.data.message || "Something loaded successfully."), {
        position: "bottom-right",
        autoClose: 5000,
        transition: Bounce,
      });

      // toast({
      //   variant: "default",
      //   title: "Yayy! Congratulations...",
      //   description: listAPIResponse.data.message || "Something loaded successfully.",
      // });
    }

    console.log(listAPIResponse)
  },

  updateAPIResponseHandler: async (data: any, updateAPITrigger: any, params: any) => {
    try {
      const serverResponse = await updateAPITrigger({ params: { _id: params.id }, body: {
        cAssignedEmployee: data.cAssignedEmployee,
      } });

      console.log(serverResponse)

      if (serverResponse.error && serverResponse.error.originalStatus === 404) {
        return toast.error(("There was a problem with server connection."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // return toast({
        //   variant: "destructive",
        //   title: "Uh oh! Cannot connect with server.",
        //   description: "There was a problem with server connection.",
        // })  
      } 
      
      if (serverResponse.error && serverResponse.error?.data?.success === false) {
        return toast.error((serverResponse.error?.data.message || "There was an error."), {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // return toast({
        //   variant: "destructive",
        //   title: "Uh oh! Something went wrong.",
        //   description: serverResponse.error.data.message || "There was an error occured.",
        // })  
      }

      if (serverResponse.data && serverResponse.data?.success === true) {
        toast.success("Employee Assigned to Respective Orgnaization Successfully", {
          position: "bottom-right",
          autoClose: 5000,
          transition: Bounce,
        });

        // toast({
        //   variant: "default",
        //   title: "Yayy! Congratulations...",
        //   description: serverResponse.data.message,
        // })
        // form.reset();

        // return navigate(
        //   fullRoute.aGlobalRoute.bProtectedRoute.bAuthorizationRoute.bSidebarRoute.fUserRoute.aListRoute, 
        //   { state: { user: true, role: false } }
        // )
      }

      return;
    } catch (error: any) {
      return toast.error(("There was a problem with try block code"), {
        position: "bottom-right",
        autoClose: 5000,
        transition: Bounce,
      });

      // return toast({
      //   variant: "destructive",
      //   title: "Uh oh! Bad code... Bad code.",
      //   description: "There was a problem with try block code",
      // })
    }

  },
}

export default apiResponseHandler;
