import { CreditCard, LogOut, ShieldUser, ShoppingBag, Star, Ticket, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import { useRequest } from '@/shared/hooks/useResquest';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export default function UserProfileDropdown() {
  const { logoutRequest } = useRequest();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutRequest(navigate);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <User className="w-5 h-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 p-4 shadow-soft border-border/50"
        align="end"
        sideOffset={8}
      >
        <DropdownMenuLabel className="pt-8 pb-6">
          <p className="font-semibold text-2xl text-foreground">Ngoc Pham</p>
        </DropdownMenuLabel>

        <DropdownMenuItem asChild>
          <Link
            to="/personal-info"
            className="p-3 cursor-pointer hover:bg-accent/80 transition-colors"
          >
            <User className="mr-3 h-5 w-5 text-muted-foreground" />
            <span className="font-bold text-sm text-muted-foreground">Personal Info</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem asChild>
          <Link to="/" className="p-3 cursor-pointer hover:bg-accent/80 transition-colors">
            <ShieldUser className="mr-3 h-5 w-5 text-muted-foreground" />
            <span className="font-bold text-sm text-muted-foreground">Login and security</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem asChild>
          <Link to="/" className="p-3 cursor-pointer hover:bg-accent/80 transition-colors">
            <CreditCard className="mr-3 h-5 w-5 text-muted-foreground" />
            <span className="font-bold text-sm text-muted-foreground">My payments</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem asChild>
          <Link to="/" className="p-3 cursor-pointer hover:bg-accent/80 transition-colors">
            <Ticket className="mr-3 h-5 w-5 text-muted-foreground" />
            <span className="font-bold text-sm text-muted-foreground">My voucher</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem asChild>
          <Link to="/" className="p-3 cursor-pointer hover:bg-accent/80 transition-colors">
            <Star className="mr-3 h-5 w-5 text-muted-foreground" />
            <span className="font-bold text-sm text-muted-foreground">My points</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem asChild>
          <Link to="/" className="p-3 cursor-pointer hover:bg-accent/80 transition-colors">
            <ShoppingBag className="mr-3 h-5 w-5 text-muted-foreground" />
            <span className="font-bold text-sm text-muted-foreground">My orders</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-2" />

        <DropdownMenuItem
          className="p-3 cursor-pointer hover:bg-destructive/10 text-destructive transition-colors"
          onClick={handleLogout}
        >
          <LogOut className="mr-3 h-5 w-5 text-destructive" />
          <span className="font-bold text-sm text-destructive">Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
