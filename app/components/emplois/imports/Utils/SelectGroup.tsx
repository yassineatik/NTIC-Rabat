import * as React from "react";
import axios from "axios";
import Select, { StylesConfig } from "react-select";
import Router, { useRouter } from "next/router";

// Icons
import ComputerIcon from "@mui/icons-material/Computer";
import BrushIcon from "@mui/icons-material/Brush";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import CalculateIcon from "@mui/icons-material/Calculate";

// ----------------------------------------------------------------------

export default function SelectGroup(props: any) {
    const router = useRouter();
    const CurrentGroup = props.GroupID;
    // Set Group state to type array with object of name and value
    const [Groups, setGroups] = React.useState<
        { name: string; value: number }[]
    >([]);
    const [GroupID, setGroupID] = React.useState<string>("");
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

    const setGroup = props.setGroup;

    const ChangeGroup = (Group: string) => {
        // Give the new GroupID to the query
        if (router.query.GroupID != Group) {
            setGroupID(Group);
            router.push({
                pathname: router.pathname,
                query: {
                    GroupID: Group,
                },
            });
            // on route change complete
            Router.events.on("routeChangeComplete", () => {
                setGroup(Group);
            });
        }
    };

    React.useEffect(() => {
        if (!(Groups.length > 0)) {
            SendRequest();
        }
    }, [GroupID, Groups.length, router, setGroup]);

    let options = Groups.map((group: { name: string; value: number }) => ({
        label: group.name,
        value: group.name,
    }));

    return (
        <>
            {/* React-select with state options */}
            <Select
                options={options}
                className="react-select-container"
                // placeholder
                placeholder="Sélectionnez un groupe:"
                isSearchable={false}
                isLoading={isLoading}
                onChange={(choice: any) => ChangeGroup(choice.value)}
                // default value
                defaultValue={GroupID ? { label: GroupID, value: GroupID } : ""}
                // custom style
                styles={{
                    control: (base: any, state: any) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#fff" : "#fff",
                        borderColor: state.isFocused ? "#fff" : "#fff",
                        color: state.isFocused ? "#39b54a" : "#fff",
                        boxShadow: "none",
                        borderRadius: "10px",
                        outline: "none",
                        border: "none",
                        padding: "0.25rem 0.25rem",
                        zIndex: "10000",
                    }),
                    menu: (base: any, state: any) => ({
                        ...base,
                        zIndex: "1000000",
                        backgroundColor: state.isFocused ? "#fff" : "#fff",
                        borderColor: state.isFocused ? "#fff" : "#fff",
                        color: state.isFocused ? "#39b54a" : "#fff",
                        boxShadow: "none",
                        borderRadius: "10px",
                        overflow: "hidden",
                    }),
                    option: (base: any, state: any) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#4BB8E7" : "#fff",
                        borderColor: state.isFocused ? "#f5f5f5" : "#fff",
                        color: state.isFocused ? "#fff" : "#303030",
                        fontFamily: "Outfit, sans-serif",
                        fontSize: "1rem",
                        fontWeight: "400",
                        padding: "0.75rem 1.25rem",
                        zIndex: "10000",
                        borderRadius: "10px",
                        // hover
                        "&:hover": {
                            backgroundColor: state.isFocused
                                ? "#4BB8E7"
                                : "#fff",
                            borderColor: state.isFocused ? "#f5f5f5" : "#fff",
                        },
                        "&:active": {
                            backgroundColor: state.isFocused
                                ? "#4BB8E7"
                                : "#fff",
                            borderColor: state.isFocused ? "#f5f5f5" : "#fff",
                        },
                    }),
                }}
            />
        </>
    );
}
