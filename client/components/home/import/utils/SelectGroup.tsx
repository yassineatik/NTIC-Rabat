import React, { useState } from "react";
import { OutlinedButton } from "../../../core/button";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import axios from "axios";
import Select, { StylesConfig } from "react-select";
import { defaultTheme } from "react-select";
import Button from "@mui/material/Button";

import Router, { useRouter } from "next/router";
import { DropdownIndicator } from "react-select/dist/declarations/src/components/indicators";

const SelectGroup = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    // Set Group state to type array with object of name and value
    const [Groups, setGroups] = React.useState<
        { name: string; value: number }[]
    >([]);
    const [isLoading, setLoading] = React.useState<boolean>(true);

    // Fetch /api/groups with axios
    const SendRequest = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/V2/groups");
            setGroups(response.data);
            setLoading(false);
            return response.data;
        } catch (e) {
            setGroups([]);
            setLoading(false);
            console.log(e);
        }
    };

    const ChangeGroup = (Group: string) => {
        Router.push({
            pathname: "/emplois",
            query: { GroupID: Group },
        });
    };

    React.useEffect(() => {
        if (!(Groups.length > 0)) {
            SendRequest();
        }
    }, [Groups.length, router, setGroups]);

    const AllOptions = Groups.map((group) => {
        return {
            value: group.name,
            label: group.name,
        };
    });

    let groupedOptions = [
        {
            label: "Développement Digitale",
            options: AllOptions.filter((group) => group.value.includes("DEV")),
        },
        {
            label: "Infographie",
            options: AllOptions.filter((group) =>
                group.value.includes("INFO")
                    ? group.value.includes("INFO")
                    : group.value.includes("DES")
            ),
        },
        {
            label: "Infrastructures Digitale",
            options: AllOptions.filter((group) => group.value.includes("ID")),
        },
        {
            label: "Gestion Des Entreprises",
            options: AllOptions.filter((group) => group.value.includes("GE")),
        },
        // other options
        {
            label: "Autres",
            options: AllOptions.filter(
                (group) =>
                    !group.value.includes("DEV") &&
                    !group.value.includes("INFO") &&
                    !group.value.includes("ID") &&
                    !group.value.includes("GE") &&
                    !group.value.includes("DES")
            ),
        },
    ];

    return (
        <>
            {/* React-select with state options */}
            <Select
                options={groupedOptions}
                className="react-select-container"
                isSearchable={false}
                isLoading={isLoading}
                // is menu open
                menuIsOpen={isOpen}
                onChange={(choice: any) => ChangeGroup(choice.value)}
                // replace main input with button
                components={{
                    IndicatorSeparator: () => null,
                    DropdownIndicator: () => null,
                    Control: () => (
                        <Button
                            onClick={() => setIsOpen(!isOpen)}
                            variant="text"
                            startIcon={<CalendarMonthOutlinedIcon />}
                            sx={{
                                width: "100%",
                                height: "100%",
                                position: "relative",
                                top: 0,
                                left: 0,
                            }}
                        >
                            Sélectionnez un groupe
                        </Button>
                    ),
                    // placeholder
                    Placeholder: () => null,
                }}
                // custom style
                styles={{
                    control: (base: any, state: any) => ({
                        ...base,
                        backgroundColor: state.isFocused
                            ? "#fff"
                            : "transparent",
                        borderColor: state.isFocused ? "#fff" : "#fff",
                        color: state.isFocused ? "#39b54a" : "#fff",
                        boxShadow: "none",
                        borderRadius: "10px",
                        outline: "none",
                        border: "none",
                        padding: "0.25rem 0.25rem",
                    }),
                    menu: (base: any, state: any) => ({
                        ...base,
                        backgroundColor: "rgba(255, 255, 255, 0.5)",
                        borderColor: state.isFocused ? "#fff" : "#fff",
                        color: state.isFocused ? "#39b54a" : "#fff",
                        // boxShadow: "none",
                        borderRadius: "10px",
                        zIndex: 100,
                        overflow: "hidden",
                        backdropFilter: "blur(10px)",
                        boxShadow:
                            "0px 0px 10rem rgba(0, 0, 0, 0.25) !important",
                    }),
                    option: (base: any, state: any) => ({
                        ...base,
                        backgroundColor: state.isSelected
                            ? "#000"
                            : "transparent",
                        borderColor: state.isSelected ? "#f5f5f5" : "#fff",
                        color: state.isSelected ? "#fff" : "#303030",
                        fontFamily: "Outfit, sans-serif",
                        fontSize: "1rem",
                        fontWeight: "400",
                        padding: "0.75rem 1.25rem",
                        borderRadius: "10px",
                        // hover
                        "&:hover": {
                            backgroundColor: state.isFocused
                                ? "#4BB8E7"
                                : "#fff",
                            borderColor: state.isFocused ? "#f5f5f5" : "#fff",
                            color:
                                state.isFocused || state.isSelected
                                    ? "#fff"
                                    : "#303030",
                        },
                        "&:active": {
                            backgroundColor: state.isFocused
                                ? "#4BB8E7"
                                : "transparent",
                            borderColor: state.isFocused ? "#f5f5f5" : "#fff",
                        },
                        // selected option
                        "&:selected": {
                            backgroundColor: "#555",
                            borderColor: state.isFocused ? "#f5f5f5" : "#fff",
                        },
                    }),
                    // group
                    groupHeading: (base: any, state: any) => ({
                        ...base,
                        fontFamily: "Outfit, sans-serif",
                        fontSize: "0.75rem",
                        fontWeight: "800",
                        padding: "0rem 1.25rem",
                        marginTop: "1rem",
                        marginBottom: "1rem",
                    }),
                }}
            />
        </>
    );
};

export default SelectGroup;
