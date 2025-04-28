const { validationResult } = require('express-validator');

const RegionAccessor = require('../model/region');
const CountryAccessor = require('../model/country');
const StateAccessor = require('../model/state');
const CityAccessor = require('../model/city');
const AddressAccessor = require('../model/address');

exports.getRegions = async (req, res, next) => {
    const regions = await RegionAccessor.findAll();
    return res.status(200).json(regions);
}

exports.getCountriesByRegion = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const regionId = req.params.regionId;
    const countries = await CountryAccessor.findAllByRegion(regionId);
    return res.status(200).json(countries);
}

exports.getStatesByCountry = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const countryId = req.params.countryId;
    const states = await StateAccessor.findAllByCountry(countryId);
    return res.status(200).json(states);
}

exports.getCitiesByState = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
		return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
	}
    const stateId = req.params.stateId;
    const cities = await CityAccessor.findAllByState(stateId);
    return res.status(200).json(cities);
}

exports.putAddress = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
    }
    const cityId = req.body.cityId;
    const postalCode = req.body.postalCode;
    const custId = req.body.customerId;
    const newAddress = await AddressAccessor.insert(cityId, postalCode, custId);
    return res.status(200).json(newAddress);
}

exports.getAddressByCustomer = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
    }
    const custId = req.params.customerId;
    const address = await AddressAccessor.findAllByCustomer(custId);
    return res.status(200).json(address);
}

exports.postAddress = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
    }
    const addressId = req.body.addressId;
    const cityId = req.body.cityId;
    const postalCode = req.body.postalCode;
    const newAddress = await AddressAccessor.update(addressId, cityId, postalCode);
    return res.status(200).json(newAddress);
}

exports.getAddressById = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
    }
    const addressId = req.params.addressId;
    const address = await AddressAccessor.findOneById(addressId);
    return res.status(200).json(address);
}