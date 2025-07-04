import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";
import { DialogDescription } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { login, signup } from "../api";
import { setUser } from "@/store";
import { useDispatch } from "react-redux";

const SignupDialog = ({trigger}:any) => {
  const [isSignup, setIsSignup] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignup) {
      try {
        const signin = await signup(
          firstName,
          lastName,
          email,
          phoneNumber,
          password
        );
        dispatch(setUser(signin));
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const data = await login(email, password);
        dispatch(setUser(data));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPhoneNumber("");
  };
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger asChild>
        {trigger }
      </DialogTrigger>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle>
            {isSignup ? "Create Account" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription>
            {isSignup
              ? "Join us to start booking your travels"
              : "Enter your credentials to access your account"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleAuth} className="space-y-4 py-4">
          {isSignup && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isSignup && (
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          )}
          <Button
            type="submit"
            className="w-full bg-blue-600 text-white"
            variant="outline"
          >
            {isSignup ? "Sign Up" : "Login"}
          </Button>
        </form>
        <div className="text-center text-sm">
          {isSignup ? (
            <>
              Already hava an account?{" "}
              <Button
                variant="link"
                className="p-0 text-blue-600"
                onClick={(e) => setIsSignup(false)}
              >
                Login
              </Button>
            </>
          ) : (
            <>
              Don't hava an account?{" "}
              <Button
                variant="link"
                className="p-0 text-blue-600"
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignupDialog;
