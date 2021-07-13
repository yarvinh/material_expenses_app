class LocationsController < ApplicationController
    
  
        def index
        end
        
        def show
            
            location = Location.find(params[:id])
            render json:LocationSerializer.new(location).to_serialized_json
        end
    
        def new
        end
    
        def create
                user = User.find(params[:user_id])
                location = Location.new(address: params[:address])
                location.user = user
                location.save
                render json:LocationSerializer.new(location).to_serialized_json
        end
    
        def destroy
            location = Location.find(params[:id])
            location.items.each{|e|e.delete}
            location.receipts.each{|e|e.delete}
            location.delete
        end
    
        def update 
            location = Location.find(params[:id])
            location.update(address: params[:address])
            render json:LocationSerializer.new(Location.find(params[:id])).to_serialized_json
        end
    
    
end
