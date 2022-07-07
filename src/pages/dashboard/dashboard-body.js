import React from "react";
import DashboardCourseDetails from "./screens/courseDetails";
import AccountSettings from "./account-settings";
import ToDo from "./screens/ToDo";

function DashboardBody({page}) {
        switch(page) {
            case 'dashboard-home':
                return (<DashboardCourseDetails />);
            case 'To-Do':
                return (<ToDo />);
            case 'account-settings':
                return (<AccountSettings />);
            case 'register-for-courses':
                //return (<RegisterForCourses />);
                break;
            case 'explore-student-products':
                //return (<ExploreStudentProducts />);
                break;
            case 'help-center':
                //return (<HelpCenter />);
                break;
            default:
                return (<h2>Page Under Construction</h2>);
        }
    }

export default DashboardBody;
