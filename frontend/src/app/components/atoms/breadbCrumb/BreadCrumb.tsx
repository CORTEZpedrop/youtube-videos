"use client";
import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { MouseEvent } from "react";
import TabIcon from "@mui/icons-material/Tab";
import { useRouter } from "next/navigation";

interface MyBreadcrumbsProps {
  labels: string[];
  links: string[];
}

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip;

const MyBreadcrumbs: React.FC<MyBreadcrumbsProps> = ({
  labels = [],
  links = [],
}) => {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, link: string) => {
    event.preventDefault();
    console.info(`Redirecting to: ${link}`);
    router.push("/");
  };

  return (
    <div role="presentation">
      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{ marginTop: 2, marginBottom: 2 }}
      >
        {labels.map((label, index) => (
          <StyledBreadcrumb
            key={index}
            component="a"
            href={links[index]}
            label={label}
            onClick={(event) => handleClick(event, links[index])}
            icon={
              label == "Home" ? (
                <HomeIcon fontSize="small" />
              ) : (
                <TabIcon fontSize="small" />
              )
            }
          />
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default MyBreadcrumbs;
