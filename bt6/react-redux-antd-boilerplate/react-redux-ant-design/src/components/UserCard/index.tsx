import React from "react";
import { Card } from "antd";
import { IUser } from "@/types/users.type";

type CardProps = {
  className?: string;
  userData: IUser;
};

export function UserCard({ className = "", userData }: CardProps) {
  const { name, username, email } = userData;
  return (
    <div className={`${className}`}>
      <Card title={name} bordered={true} style={{ width: 300 }}>
        <p>Username : {username}</p>
        <p>Email: {email}</p>
      </Card>
    </div>
  );
}
