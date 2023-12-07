import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
//import ReportList from "../components/ReportList";
//import EventList from "../components/EventList";

const ReportList = () => {
  return <div>This is a placeholder for the ReportList component.</div>;
};

const EventList = () => {
  return <div>This is a placeholder for the EventList component.</div>;
};

const AdminPage = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    return (
        <div className="admin-page">
            <Tabs value={selectedTab} onChange={handleTabChange} centered>
                <Tab label="Reports" />
                <Tab label="Events" />
            </Tabs>
            <div className="content">
                {selectedTab === 0 ? (
                   <ReportList />
                ) : (
                   <EventList />
                )}
            </div>
        </div>
    );
};

export default AdminPage;
