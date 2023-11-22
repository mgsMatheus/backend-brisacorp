import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { CrudDataSource } from "@brisacorp/common/base/data";
import { Hospital } from "../entities/hospitals.entity";
import { Doctor } from "../entities/doctors.entity";
import { DoctorDto } from "@brisacorp/common/dtos/hospitals/doctor.dto";
import { SpecialtyDto } from "@brisacorp/common/dtos/hospitals/specialty.dto";
import { DatesAvailablesDto } from "@brisacorp/common/dtos/hospitals/dates-availables.dto";

@Injectable()
export class HospitalsDataSource extends CrudDataSource<Hospital> {
  constructor(
    @InjectModel(Hospital.name)
    private readonly hospitalModel: Model<Hospital>,
  ) {
    super(hospitalModel);
  }

  public async createDoctor(
    hospitalId: string,
    doctor: Doctor,
  ): Promise<Doctor> {
    const updateDoctor = await this.hospitalModel
      .findByIdAndUpdate(
        hospitalId,
        {
          $push: { doctors: doctor },
        },
        { new: true },
      )
      .exec();
    return updateDoctor.doctors.find((item) => item.name === doctor.name);
  }

  public async getDoctors(
    hospitalId: string,
    doctor: string,
    specialty: string,
  ): Promise<DoctorDto[]> {
    const ObjectId = new mongoose.Types.ObjectId(hospitalId);
    if (doctor !== "" && specialty === "") {
      return await this.getDoctorFilterName(ObjectId, doctor);
    }

    if (doctor === "" && specialty !== "") {
      return await this.getDoctorFilterSpecialty(ObjectId, specialty);
    }

    if (doctor !== "" && specialty !== "") {
      return await this.getDoctorFilterSpecialtyAndName(
        ObjectId,
        doctor,
        specialty,
      );
    }
    return await this.getDoctorAll(ObjectId);
  }

  async getDoctorAll(id) {
    const getDoctors = await this.hospitalModel
      .aggregate([
        { $match: { _id: id } },
        {
          $unwind: "$doctors",
        },
        {
          $project: {
            doctors: 1,
          },
        },
      ])
      .exec();
    return getDoctors;
  }

  async getDoctorFilterName(id, doctor) {
    const regex = new RegExp(`^${doctor}`, "i");
    const getDoctors = await this.hospitalModel
      .aggregate([
        { $match: { _id: id } },
        {
          $unwind: "$doctors",
        },
        {
          $project: {
            doctors: 1,
          },
        },
        {
          $match: {
            "doctors.name": { $regex: regex },
          },
        },
      ])
      .exec();
    return getDoctors;
  }

  async getDoctorFilterSpecialty(id, specialty) {
    const regex = new RegExp(`^${specialty}`, "i");
    const getDoctors = await this.hospitalModel
      .aggregate([
        { $match: { _id: id } },
        {
          $unwind: "$doctors",
        },
        {
          $project: {
            doctors: 1,
          },
        },
        {
          $match: {
            "doctors.specialty": { $regex: regex },
          },
        },
      ])
      .exec();
    return getDoctors;
  }

  async getDoctorFilterSpecialtyAndName(id, doctor, specialty) {
    const regex = new RegExp(`^${doctor}`, "i");
    const regexSpecialty = new RegExp(`^${specialty}`, "i");
    const getDoctors = await this.hospitalModel
      .aggregate([
        { $match: { _id: id } },
        {
          $unwind: "$doctors",
        },
        {
          $project: {
            doctors: 1,
          },
        },
        {
          $match: {
            "doctors.name": { $regex: regex },
            "doctors.specialty": { $regex: regexSpecialty },
          },
        },
      ])
      .exec();
    return getDoctors;
  }

  async getDoctorById(id: string): Promise<DoctorDto[]> {
    const ObjectId = new mongoose.Types.ObjectId(id);
    const getDoctors = await this.hospitalModel
      .aggregate([
        {
          $unwind: "$doctors",
        },
        {
          $project: {
            doctors: 1,
          },
        },
        {
          $match: {
            "doctors._id": ObjectId,
          },
        },
      ])
      .exec();
    return getDoctors;
  }

  filterSpecialty(): Promise<SpecialtyDto[]> {
    const getDoctors = this.hospitalModel
      .aggregate([
        {
          $unwind: "$doctors",
        },
        {
          $project: {
            _id: 0,
            "doctors.specialty": 1,
          },
        },
      ])
      .exec();
    return getDoctors;
  }

  public async getDateAvailableBySpecialty(
    specialty: string,
  ): Promise<DatesAvailablesDto[]> {
    const date = await this.hospitalModel.aggregate([
      {
        $unwind: "$doctors",
      },
      {
        $project: {
          "doctors.specialty": 1,
          _id: {
            $toString: "$doctors._id",
          },
        },
      },
      {
        $lookup: {
          from: "dateavailables",
          localField: "_id",
          foreignField: "doctorId",
          as: "datesDoctors",
        },
      },
      {
        $match: {
          "doctors.specialty": specialty,
          "datesDoctors.active": true,
        },
      },
    ]);
    return date;
  }

  public async getHourAvailable(
    specialty: string,
    date: string,
  ): Promise<DatesAvailablesDto[]> {
    const hour = await this.hospitalModel.aggregate([
      {
        $unwind: "$doctors",
      },
      {
        $project: {
          "doctors.specialty": 1,
          _id: {
            $toString: "$doctors._id",
          },
        },
      },
      {
        $lookup: {
          from: "dateavailables",
          localField: "_id",
          foreignField: "doctorId",
          as: "datesDoctors",
        },
      },
      {
        $match: {
          "doctors.specialty": specialty,
          "datesDoctors.active": true,
          "datesDoctors.date": date,
        },
      },
    ]);
    return hour;
  }
}
