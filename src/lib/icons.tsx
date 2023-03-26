import { Heart } from "@styled-icons/ionicons-outline/Heart";
import { Options } from "@styled-icons/ionicons-solid/Options";
import { PresenceBlocked } from "@styled-icons/fluentui-system-regular/PresenceBlocked";
import { ChevronDown, City } from "@styled-icons/fa-solid";
import { Link } from "@styled-icons/octicons/Link";
import { DonateHeart } from "@styled-icons/boxicons-regular/DonateHeart";
import {
	Flag,
	Home,
	Add,
	ContactMail,
	Group,
	OpenInNew,
	ArrowLeft,
	ArrowRight,
	Visibility,
	MoreVert,
	Chat,
	Reply,
	ThumbUpAlt,
	ThumbDownAlt,
	ArrowDropDown,
	Send,
	Cancel,
	Mail,
	Ballot,
	FavoriteBorder,
	Comment,
	IosShare,
	PlayCircleOutline,
	Person,
	PersonAdd,
	Check,
	ArrowBack,
	Inbox,
	Policy,
	Settings,
	BugReport,
	Logout,
	DarkMode,
	LightMode,
	Notifications,
	NotificationsOff,
	Search,
} from "@styled-icons/material-rounded";

interface IconProps {
	icon: string;
	className?: string;
	size?: number;
	title?: string;
}
export default function Icon(props: IconProps) {
	const { icon, className = "", size = 20, title } = { ...props };
	return (
		<div className={`styled-icon-base ${className}`}>
			{(() => {
				switch (icon) {
					case "Add":
						return <Add size={size} title={title} />;
					case "ArrowBack":
						return <ArrowBack size={size} title={title} />;
					case "ArrowDropDown":
						return <ArrowDropDown size={size} title={title} />;
					case "ArrowLeft":
						return <ArrowLeft size={size} title={title} />;
					case "ArrowRight":
						return <ArrowRight size={size} title={title} />;
					case "Ballot":
						return <Ballot size={size} title={title} />;
					case "Blocked":
						return <PresenceBlocked size={size} title={title} />;
					case "BugReport":
						return <BugReport size={size} title={title} />;
					case "Cancel":
						return <Cancel size={size} title={title} />;
					case "Chat":
						return <Chat size={size} title={title} />;
					case "Check":
						return <Check size={size} title={title} />;
					case "ChevronDown":
						return <ChevronDown size={size} title={title} />;
					case "City":
						return <City size={size} title={title} />;
					case "Comment":
						return <Comment size={size} title={title} />;
					case "Contact":
						return <ContactMail size={size} title={title} />;
					case "DarkMode":
						return <DarkMode size={size} title={title} />;
					case "DonateHeart":
						return <DonateHeart size={size} title={title} />;
					case "FavoriteBorder":
						return <FavoriteBorder size={size} title={title} />;
					case "Flag":
						return <Flag size={size} title={title} />;
					case "Group":
						return <Group size={size} title={title} />;
					case "Heart":
						return <Heart size={size} title={title} />;
					case "Home":
						return <Home size={size} title={title} />;
					case "Inbox":
						return <Inbox size={size} title={title} />;
					case "IosShare":
						return <IosShare size={size} title={title} />;
					case "LightMode":
						return <LightMode size={size} title={title} />;
					case "Link":
						return <Link size={size} title={title} />;
					case "Logout":
						return <Logout size={size} title={title} />;
					case "Mail":
						return <Mail size={size} title={title} />;
					case "MoreVert":
						return <MoreVert size={size} title={title} />;
					case "Notifications":
						return <Notifications size={size} title={title} />;
					case "NotificationsOff":
						return <NotificationsOff size={size} title={title} />;
					case "OpenInNew":
						return <OpenInNew size={size} title={title} />;
					case "Options":
						return <Options size={size} title={title} />;
					case "Person":
						return <Person size={size} title={title} />;
					case "PersonAdd":
						return <PersonAdd size={size} title={title} />;
					case "PlayCircleOutline":
						return <PlayCircleOutline size={size} title={title} />;
					case "Policy":
						return <Policy size={size} title={title} />;
					case "Reply":
						return <Reply size={size} title={title} />;
					case "Search":
						return <Search size={size} title={title} />;
					case "Send":
						return <Send size={size} title={title} />;
					case "Settings":
						return <Settings size={size} title={title} />;
					case "ThumbsUpAlt":
						return <ThumbUpAlt size={size} title={title} />;
					case "ThumbsDownAlt":
						return <ThumbDownAlt size={size} title={title} />;
					case "Visibility":
						return <Visibility size={size} title={title} />;
					default:
						return <Heart size={size} title={title} />;
				}
			})()}
		</div>
	);
}
//abcdefghijklmnopqrstuvwxyz
