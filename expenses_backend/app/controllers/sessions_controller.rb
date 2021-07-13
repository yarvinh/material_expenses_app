class SessionsController < ApplicationController

    def create 
        @user = User.find_by(username: params[:user][:username])
        if @user
            return redirect_to '/sessions/new' unless @user.authenticate(params[:user][:password])
            session[:user_id] = @user.id
            redirect_to user_path(@user)
        elsif @employee
            return redirect_to '/sessions/new' unless @employee.authenticate(params[:user][:password])
            session[:employee_id] = @employee.id
            redirect_to user_employee_path(@employee.user, @employee)
         else
            redirect_to '/sessions/new'
        end  
    end

     
    def destroy
        session.clear
        redirect_to '/'
    end
     

  
end
