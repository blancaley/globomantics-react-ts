import React from "react";

// This handles the state for the authentication of this React app, as well as some derived values we can pass down using the Provider component returned from our AuthContext.

interface AuthContextValues {
  authInfo: AuthInfo;
  isAuthenticated: boolean;
  setAuthInfo: React.Dispatch<React.SetStateAction<AuthInfo>>;
  isAdmin: boolean;
}
// Set up the context
// Declare the context to start out with no value. The values are later provided within the AuthProvider declaration.
// Provide explicit type annotations using a generic: we are going to have two different types: the default type (undeifned) and the type of the values we pass in when initializing our Provider component
export const AuthContext = React.createContext<undefined | AuthContextValues>(
  undefined
);
const Provider = AuthContext.Provider;

interface Props {
  children: React.ReactNode;
}

interface UserData {
  role: "USER" | "ADMIN";
}

interface AuthInfo {
  userData: UserData | null
}

// Use type annotation for children prop
export function AuthProvider({ children }: Props) {

  // Pass generic type argument to useState
  const [authInfo, setAuthInfo] = React.useState<AuthInfo>({
    userData: null,
  });

  // Provide an explicit null check to coerce the type to be a Boolean. 
  const isAuthenticated = authInfo.userData !== null;

  const isAdmin = authInfo.userData?.role === "ADMIN";

  return (
    <Provider value={{ authInfo, isAuthenticated, setAuthInfo, isAdmin }}>
      {children}
    </Provider>
  );
}

// Custome hook to abstract checking the value to make sure it's not undefined. 
//  This narrows the type so that the only thing returned from our hook is a fully valid context value. 
export const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (context === undefined) {
    // handle
    throw new Error("useAuthContext should be used within an AuthProvider.")
  }
  return context;
}