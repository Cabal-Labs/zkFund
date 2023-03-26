import { extendTheme } from "@chakra-ui/react";

const config = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};
const colors = {
	primary: "#D37CF1",
	primaryLight: "#E5A7FB",
	primaryDark: "#961BC0",
	text: "#FCFCFC",
	secondaryText: "#cccccc",
	border: "#333333",
	background: "#22142F",
	foreground: "#422552",
	danger: "#C74F4F",
	success: "#65B36D",
	link: "#4C81BF",
	buttonBackground: "#2B242E",
};
const components = {
	Button: {
		baseStyle: {
			margin: 0.5,
			_hover: { opacity: "85%" },
			_focus: {
				boxShadow: "none",
			},
		},
		sizes: {
			xl: {
				h: "56px",
				fontSize: "lg",
				px: "32px",
			},
		},

		variants: {
			contained: () => ({
				color: "white",
				backgroundColor: colors.primary,
				_hover: {
					outlineColor: colors.primaryDark,
					outlineWidth: 1,
					outlineStyle: "solid",
				},
				_disabled: {
					opacity: 0.25,
					backgroundColor: colors.primary,
				},
			}),
			primary: () => ({
				color: colors.primaryDark,
				backgroundColor: colors.primaryLight,
			}),
			danger: () => ({
				color: "white",
				backgroundColor: colors.danger,
			}),
			success: () => ({
				color: "white",
				backgroundColor: colors.success,
			}),
			outlined: () => ({
				borderWidth: 1,
				borderStyle: "solid",
				borderColor: colors.secondaryText,
				color: colors.text,
				_hover: { backgroundColor: colors.foreground },
			}),
			pinkOutline: () => ({
				color: "white",
				backgroundColor: colors.buttonBackground,
				borderRadius: 1000,
				borderWidth: 2,
				borderColor: colors.primary,
				paddingLeft: 10,
				paddingRight: 10,
				paddingTop: 5,
				paddingBottom: 5,
				fontFamily: "Arvo",
				fontWeight: "regular",
				fontSize: "lg",
			}),
			gradientOutline: () => ({
				fontFamily: "Arvo",
				fontWeight: "regular",
				fontSize: "lg",
				color: "white",
				border: "solid 2px transparent",
				borderRadius: "12px",
				paddingLeft: "2rem",
				paddingRight: "2rem",
				// below 3 attributes are used for the border gradient
				backgroundImage:
					"linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #5960FF, #5200FF, #0085FF)",
				backgroundOrigin: "border-box",
				boxShadow: "2px 1000px 1px #171616 inset",
				_hover: {
					opacity: "85%",
				},
				_active: {
					opacity: "65%",
					// below 2 attributes keep gradient border consistent
					backgroundImage:
						"linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #5960FF, #5200FF, #0085FF)",
					boxShadow: "2px 1000px 1px #171616 inset",
				},
				_focus: {
					// below 2 attributes keep gradient border consistent
					backgroundImage:
						"linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #5960FF, #5200FF, #0085FF)",
					boxShadow: "2px 1000px 1px #171616 inset",
				},
			}),
			text: () => ({
				_hover: { backgroundColor: colors.foreground },
			}),
			link: () => ({
				color: colors.link,
				_hover: { backgroundColor: colors.foreground },
			}),
			filled: () => ({
				backgroundColor: colors.foreground,
			}),
		},
		defaultProps: {
			variant: "contained",
			size: "md",
		},
	},
	IconButton: {
		variant: {
			text: () => ({
				backgroundColor: "transparent",
			}),
		},
	},
	Tooltip: {
		baseStyle: () => ({
			borderRadius: 5,
			backgroundColor: colors.foreground,
			color: colors.text,
		}),
	},

	Input: {
		baseStyle: {},
		variants: {
			outlined: () => ({
				field: {
					background: "transparent",
					borderWidth: 2,
					borderColor: colors.border,
					color: colors.text,
					_focus: {
						borderColor: colors.primary,
						borderWidth: 2,
					},
				},
			}),
			filled: () => ({
				backgroundColor: colors.foreground,
				_focus: {
					borderColor: colors.primary,
					borderWidth: 2,
				},
			}),
			underlined: () => ({
				field: {
					backgroundColor: "transparent",
					borderBottomWidth: 3,
					borderRadius: 0,
					borderColor: "black",
					_focus: {
						borderColor: colors.primary,
					},
				},
			}),
		},
		defaultProps: { variant: "outlined" },
	},
	Textarea: {
		baseStyle: {},
		variants: {
			outlined: () => ({
				background: "transparent",
				borderWidth: 2,
				borderColor: colors.border,
				_focus: {
					borderColor: colors.primary,
					borderWidth: 2,
				},
			}),
		},
		defaultProps: { variant: "outlined" },
	},
	Select: {
		baseStyle: {},
		variants: {
			outlined: () => ({
				field: {
					background: "transparent",
					borderWidth: 2,
					borderColor: colors.border,
					_focus: {
						borderColor: colors.primary,
						borderWidth: 2,
					},
				},
			}),
		},
		defaultProps: { variant: "outlined" },
	},
	FormLabel: {
		baseStyle: {
			fontFamily: "Arvo",
			fontSize: "lg",
		},
	},
	Modal: {
		parts: ["dialog", "header", "body"],
		variants: {
			outlined: () => ({
				dialog: {
					backgroundColor: colors.buttonBackground,
					borderRadius: 15,
					borderWidth: 2,
					borderColor: colors.primary,
				},
			}),
			gradientOutlined: () => ({
				dialog: {
					borderRadius: 15,
					borderWidth: 2,
					backgroundImage:
						"linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), linear-gradient(101deg, #5960FF, #5200FF, #0085FF)",
					backgroundOrigin: "border-box",
					boxShadow: "2px 1000px 1px #171616 inset",
				},
			}),
		},
		defaultProps: { variant: "outlined" },
	},
	Popover: {
		variants: {
			primary: () => ({
				backgroundColor: colors.foreground,
			}),
		},
	},
	Tag: {
		variants: {
			contained: () => ({
				color: "white",
				backgroundColor: colors.primary,
			}),
			danger: () => ({
				color: "white",
				backgroundColor: colors.danger,
			}),
			outlined: () => ({
				borderWidth: 1,
				borderStyle: "solid",
				borderColor: colors.secondaryText,
				color: colors.text,
				_hover: { backgroundColor: colors.foreground },
			}),
			text: () => ({
				_hover: { backgroundColor: colors.foreground },
			}),
			filled: () => ({
				backgroundColor: colors.foreground,
			}),
		},
	},
	Drawer: {
		parts: ["dialog", "header", "body"],
		variants: {
			primary: () => ({
				dialog: {
					backgroundColor: colors.foreground,
				},
			}),
		},
	},
	Checkbox: {
		variants: {
			primary: () => ({
				control: {
					borderColor: "black",
					height: 8,
					width: 8,
					borderRadius: 8,
					_checked: {
						borderColor: "black",
						backgroundColor: "transparent",
						_hover: {
							borderColor: colors.primary,
							backgroundColor: "transparent",
						},
						_focus: {
							borderColor: colors.primary,
							backgroundColor: "transparent",
						},
					},
					_focus: {
						borderColor: "black",
						backgroundColor: "transparent",
					},
					_hover: {
						borderColor: colors.primary,
						backgroundColor: "transparent",
					},
				},
				label: {
					fontSize: "lg",
				},
				icon: {
					color: "white",
				},
			}),
		},
		defaultProps: { variant: "primary" },
	},
};
const chakraTheme = extendTheme({ components, colors, config });
export default chakraTheme;
