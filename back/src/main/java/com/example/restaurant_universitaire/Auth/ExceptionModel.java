package com.example.restaurant_universitaire.Auth;

import java.sql.Timestamp;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.Accessors;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Accessors(chain = true)
public class ExceptionModel extends ResponseModel {
    private Timestamp timestamp;


}