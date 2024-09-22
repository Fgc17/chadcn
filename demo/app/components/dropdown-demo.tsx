import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "chadcn/components/button";
import {
  Dropdown,
  DropdownContent,
  DropdownGroup,
  DropdownItem,
  DropdownLabel,
  DropdownPortal,
  DropdownSeparator,
  DropdownShortcut,
  DropdownSub,
  DropdownSubContent,
  DropdownSubTrigger,
  DropdownTrigger,
} from "chadcn/components/dropdown-menu";

export function DropdownDemo() {
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownTrigger>
      <DropdownContent className="w-56">
        <DropdownLabel>My Account</DropdownLabel>
        <DropdownSeparator />
        <DropdownGroup>
          <DropdownItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <DropdownShortcut>⇧⌘P</DropdownShortcut>
          </DropdownItem>
          <DropdownItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <DropdownShortcut>⌘B</DropdownShortcut>
          </DropdownItem>
          <DropdownItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <DropdownShortcut>⌘S</DropdownShortcut>
          </DropdownItem>
          <DropdownItem>
            <Keyboard className="mr-2 h-4 w-4" />
            <span>Keyboard shortcuts</span>
            <DropdownShortcut>⌘K</DropdownShortcut>
          </DropdownItem>
        </DropdownGroup>
        <DropdownSeparator />
        <DropdownGroup>
          <DropdownItem>
            <Users className="mr-2 h-4 w-4" />
            <span>Team</span>
          </DropdownItem>
          <DropdownSub>
            <DropdownSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Invite users</span>
            </DropdownSubTrigger>
            <DropdownPortal>
              <DropdownSubContent>
                <DropdownItem>
                  <Mail className="mr-2 h-4 w-4" />
                  <span>Email</span>
                </DropdownItem>
                <DropdownItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Message</span>
                </DropdownItem>
                <DropdownSeparator />
                <DropdownItem>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>More...</span>
                </DropdownItem>
              </DropdownSubContent>
            </DropdownPortal>
          </DropdownSub>
          <DropdownItem>
            <Plus className="mr-2 h-4 w-4" />
            <span>New Team</span>
            <DropdownShortcut>⌘+T</DropdownShortcut>
          </DropdownItem>
        </DropdownGroup>
        <DropdownSeparator />
        <DropdownItem>
          <Github className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownItem>
        <DropdownItem>
          <LifeBuoy className="mr-2 h-4 w-4" />
          <span>Support</span>
        </DropdownItem>
        <DropdownItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownShortcut>⇧⌘Q</DropdownShortcut>
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}
