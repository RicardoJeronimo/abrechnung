import { Checkbox, FormControlLabel, TextField, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";

export const DisabledTextField = styled(TextField)(({ theme }: { theme: Theme }) => ({
    "& .Mui-disabled": {
        color: theme.palette.text.primary,
        WebkitTextFillColor: theme.palette.text.primary,
    },
})) as typeof TextField;

export const DisabledFormControlLabel = styled(FormControlLabel)(({ theme }: { theme: Theme }) => ({
    "& .Mui-disabled": {
        color: theme.palette.text.primary,
        WebkitTextFillColor: theme.palette.text.primary,
    },
})) as typeof FormControlLabel;

export const DisabledCheckbox = styled(Checkbox)(({ theme }: { theme: Theme }) => ({
    "& .Mui-disabled": {
        color: theme.palette.text.primary,
        WebkitTextFillColor: theme.palette.text.primary,
    },
})) as typeof Checkbox;